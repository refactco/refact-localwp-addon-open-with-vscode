// https://getflywheel.github.io/local-addon-api/modules/_local_main_.html
import * as LocalMain from '@getflywheel/local/main';
import { shell } from 'electron';
import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';

export default function (context: LocalMain.AddonMainContext): void {
	// The context object allows us to interact with various parts of Electron's main thread.
	const { electron } = context;
	const { ipcMain } = electron;

	const { localLogger } = LocalMain.getServiceContainer().cradle;

	// Local uses Winston for logging which means we can create create child
	// loggers with additional metadata. For example, the below child logger
	// will log something like this within the Local log:
	//
	// {"thread":"main","addon":"boilerplate","level":"info","message":"Saving count 47 for site 5efOKun5u.","timestamp":"2022-12-21T16:43:40.515Z"}
	const logger = localLogger.child({
		thread: 'main',
		addon: 'boilerplate',
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
