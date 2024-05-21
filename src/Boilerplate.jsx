import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

// https://github.com/getflywheel/local-components
import { Button, Text } from '@getflywheel/local-components';

const Boilerplate = (props) => {
	const [isVSCodeInstalled, setIsVSCodeInstalled] = useState(false);

	useEffect(() => {
		const checkEditorsInstalled = async () => {
			const vscodeInstalled = await ipcRenderer.invoke('check-vscode-installed');
			setIsVSCodeInstalled(vscodeInstalled);

		};

		checkEditorsInstalled();
	}, []);

	const openInVSCode = () => {
		const projectDir = props.site.path; // Assuming `path` contains the project directory
		ipcRenderer.send('open-in-vscode', projectDir);
	};


	return (
		<div style={{ flex: '1', overflowY: 'auto', margin: '10px' }}>
			{isVSCodeInstalled ? (
				<Button onClick={openInVSCode}>Open in VS Code</Button>
			) : (
				<Text>Visual Studio Code is not installed on this system.</Text>
			)}
		</div>
	);
};

export default Boilerplate;
