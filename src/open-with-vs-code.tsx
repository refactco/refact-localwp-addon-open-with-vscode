import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { toast } from 'react-toastify';
import { Alert, Button, Text, ToastContainer } from '@getflywheel/local-components';

const OpenWithVsCode = ({ site }) => {

	const [isVSCodeInstalled, setIsVSCodeInstalled] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const checkEditorsInstalled = async () => {
			const vscodeInstalled = await ipcRenderer.invoke('check-vscode-installed');
			setIsVSCodeInstalled(vscodeInstalled);
			setIsLoading(false);

		};

		checkEditorsInstalled();
	}, []);

	useEffect(() => {
		const insertElement = () => {
			const targetElement = document.querySelector('[class^="InnerPaneSidebar"]');
			const openWithVsCodeElement = document.querySelector('.open-with-vs-code');
			if (targetElement && openWithVsCodeElement) {
				// Insert the new div as the first child of targetElement
				targetElement.insertBefore(openWithVsCodeElement, targetElement.firstChild);
			}
		};

		if (document.readyState === 'loading') {  // If document is still loading, adding event listener
			document.addEventListener('DOMContentLoaded', insertElement);
		} else {  // `DOMContentLoaded` already fired
			insertElement();
		}

		// Cleanup function to remove the event listener
		return () => {
			document.removeEventListener('DOMContentLoaded', insertElement);
		};
	}, []);

	const openInVSCode = () => {
		const projectDir = site.path; // Assuming `path` contains the project directory
		ipcRenderer.send('open-in-vscode', projectDir);
		toast.success('Project opened successfully with Visual Studio Code!', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			theme: 'light',
		});
	};


	return (
		<div style={{ overflowY: 'auto', margin: '10px' }} className="open-with-vs-code">
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
			{!isLoading
				? isVSCodeInstalled ? (
					<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
						<Button style={{ padding: '7px 10px', display: 'flex', gap: '4px' }} onClick={openInVSCode}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 15.851562 2.0332031 C 15.454446 2.0917651 15.074935 2.2655063 14.767578 2.5449219 L 14.765625 2.5449219 C 13.277863 3.9005836 10.616498 6.3243944 8.1972656 8.5273438 L 5.84375 6.734375 L 5.8359375 6.7285156 C 5.1392465 6.2166177 4.2073179 6.2866386 3.5683594 6.7441406 C 3.3534247 6.8975345 3.179469 7.0602489 2.9960938 7.2246094 C 2.8123509 7.3892993 2.65625 7.5332031 2.65625 7.5332031 L 2.7128906 7.4863281 C 1.8204736 8.2023368 1.7705385 9.5910312 2.6132812 10.367188 L 2.6152344 10.369141 L 4.3964844 11.988281 C 3.5664818 12.744059 2.6171875 13.609375 2.6171875 13.609375 L 2.6132812 13.611328 L 2.6113281 13.613281 C 1.7701612 14.390063 1.8188576 15.778914 2.7128906 16.494141 L 2.65625 16.445312 C 2.65625 16.445312 2.8103543 16.588916 2.9941406 16.753906 C 3.1779269 16.918896 3.3539505 17.08207 3.5703125 17.236328 C 4.2099405 17.692377 5.1382701 17.762436 5.8359375 17.251953 L 5.84375 17.246094 L 8.2011719 15.451172 L 14.769531 21.425781 C 15.386532 21.986866 16.295571 22.122799 17.050781 21.757812 C 18.278625 21.166887 20.046146 20.315485 20.783203 19.960938 C 21.5262 19.604374 22.001953 18.845527 22.001953 18.023438 L 22.001953 5.9335938 C 22.001953 5.110945 21.525211 4.3516313 20.779297 3.9960938 L 20.777344 3.9941406 C 20.089585 3.6662272 18.39449 2.8576642 17.039062 2.2109375 C 16.663742 2.031938 16.24868 1.9746412 15.851562 2.0332031 z M 17 4.4082031 C 18.123459 4.9444456 19.380428 5.544512 19.917969 5.8007812 C 19.970569 5.8257663 20.001953 5.8731922 20.001953 5.9335938 L 20.001953 18.023438 C 20.001953 18.085348 19.970969 18.132767 19.917969 18.158203 C 19.340838 18.43582 18.085137 19.039955 17 19.5625 L 17 4.4082031 z M 15 5.0371094 L 15 7.7636719 L 11.09375 10.736328 L 9.8144531 9.7617188 C 11.735091 8.0128243 13.554462 6.3537546 15 5.0371094 z M 4.7128906 8.3867188 L 15 16.228516 L 15 18.931641 L 4.0507812 8.9707031 C 4.0752634 8.9480007 4.178441 8.850757 4.3300781 8.7148438 C 4.4912252 8.5704065 4.6942539 8.4020803 4.7128906 8.3867188 z M 15 10.277344 L 15 13.712891 L 12.744141 11.994141 L 15 10.277344 z M 5.8808594 13.339844 L 6.6972656 14.082031 L 4.7128906 15.591797 C 4.6939997 15.57613 4.4907783 15.40989 4.3300781 15.265625 C 4.178427 15.129484 4.0751918 15.03049 4.0507812 15.007812 C 4.1027294 14.960483 4.9781341 14.16179 5.8808594 13.339844 z"/></svg>
							Open with VS Code
						</Button>
					</div>
				) : (
					<Alert type='warning'>
						<Text>Install Visual Studio Code to use this add-on.</Text>
					</Alert>
				) : null}
		</div>
	);
};

export default OpenWithVsCode;
