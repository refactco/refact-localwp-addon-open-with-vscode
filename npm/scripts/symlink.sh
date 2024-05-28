#!/bin/sh

function link {
	local pwd=$(pwd)
	local addondir="$HOME/Library/Application Support/Local/addons"
	local addonpath="$addondir/vscode-localwp-addon"

	if [ ! -d "$addondir" ]; then
		echo "⚠️  Cannot locate $addondir, is Local installed?"
		exit 0
	fi

	if [ -d "$addonpath" ]; then
		echo "🛑  $addonpath already exists, refusing to link.\n"
		exit 0
	fi

	ln -sf "$pwd" "$addonpath"

	echo "🔗  Linked to $addonpath"
	echo "⚙️  Building..."

	npm install --prefix "$addonpath"
	npm run build --prefix "$addonpath"

	echo "✅  Done, vscode-localwp-addon added to $addonpath"
}

link