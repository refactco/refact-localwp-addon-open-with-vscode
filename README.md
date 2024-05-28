# Open with VS Code - LocalWP Add-on by Refact
Instantly open project in Visual Studio Code with a single click.
![image](https://github.com/refactco/refact-localwp-addon-open-with-vscode/assets/107167473/f6bb2b98-8b24-4c5a-a3d0-1078a01bf10a)



## Install

Download the `.tgz` file from a [release](https://github.com/refactco/refact-localwp-addon-open-with-vscode/releases). Navigate to *Local → Addons → Installed → Install from Disk* and select the `.tgz` file. Enable *VS Code* and restart Local.

## Usage

1. Open LocalWP. 
2. Navigate to the site you want to work on. 
3. Go to the Overview tab.
4. Click the "Open With VS Code" button.
4. The project directory will open in Visual Studio Code.

## Development

Clone the repo anywhere you want using:

```
git clone https://github.com/refactco/refact-localwp-addon-open-with-vscode.git
```

Then, cd into the repo and run `npm run link` and it will automatically symlink to your Local addons folder and build the package.

If the `npm run link` didn't work, you should move the add-on folder to your LocalWP add-ons directory.
- For Windows: `C:\Users\<YourUsername>\AppData\Roaming\Local\addons`
- For macOS: `/Users/<YourUsername>/Library/Application Support/Local/addons`
- For Linux: `~/.config/Local/addons`

then run `npm run build` or `npm run watch` to develop.

`main` will be the current development version.

### Packaging for release

Run `npm pack` to create a package to distribute to release channels.

### Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Support
If you have any questions or need help, feel free to open an issue on the [GitHub repository](https://github.com/refactco/refact-localwp-addon-open-with-vscode).
