import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { toast } from 'react-toastify';
// https://github.com/getflywheel/local-components
import { Text, Alert, ToastContainer } from '@getflywheel/local-components';

const Boilerplate = (props) => {
	const [isVSCodeInstalled, setIsVSCodeInstalled] = useState(true);

	const openInVSCode = () => {
		const projectDir = props.site.path;
		ipcRenderer.send('open-in-vscode', projectDir);
	};

	useEffect(() => {
		const checkEditorsInstalled = async () => {
			const vscodeInstalled = await ipcRenderer.invoke('check-vscode-installed');

			setIsVSCodeInstalled(vscodeInstalled);
			if (vscodeInstalled) {
				openInVSCode();
				toast.success('Project opened successfully in Visual Studio Code!', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: 'light',
				});
			}

		};

		checkEditorsInstalled();
	}, []);

	return (
		<div style={{ flex: '1', overflowY: 'auto', margin: '10px' }}>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{!isVSCodeInstalled && (
				<Alert type="warning">
					<Text>
						Visual Studio Code is not installed on this system.
						install it to use this add-on.
					</Text>
				</Alert>
			)}
		</div>
	);
};

export default Boilerplate;
