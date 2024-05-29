// https://getflywheel.github.io/local-addon-api/modules/_local_main_.html
import * as LocalMain from '@getflywheel/local/main';
import { shell } from 'electron';
import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';

export default function (context: LocalMain.AddonMainContext): void {
	const { electron } = context;
	const { ipcMain } = electron;

	const { localLogger } = LocalMain.getServiceContainer().cradle;

	const logger = localLogger.child({
		thread: 'main',
		addon: 'open-in-vscode',
	});

	ipcMain.on('open-in-vscode', (event, projectDir) => {
		// Resolve the project directory
		let absolutePath = projectDir;
		if (projectDir.startsWith('~')) {
			const homeDir = os.homedir();
			absolutePath = path.join(homeDir, projectDir.slice(2));
		} else {
			absolutePath = path.resolve(projectDir);
		}
		const vscodeUrl = `vscode://file/${absolutePath}/app/public`;
		shell.openExternal(vscodeUrl);
		logger.log('info', `Opening project directory in VS Code: ${absolutePath}`);
	});

	const checkIfInstalled = (command: string) => new Promise<boolean>((resolve) => {
		exec(command, (err) => {
			resolve(!err);
		});
	});

	ipcMain.handle('check-vscode-installed', async () => {
		let command = '';
		switch (process.platform) {
			case 'win32':
				command = 'code --version';
				break;
			case 'darwin':
				command = 'open -Ra "Visual Studio Code"';
				break;
			default:
				command = 'code --version';
				break;
		}

		return await checkIfInstalled(command);
	});

}
