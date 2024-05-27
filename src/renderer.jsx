import OpenWithVsCode from './open-with-vs-code';


export default function (context) {
	const { React, hooks } = context;

	hooks.addContent('SiteInfoOverview', (site) => (
		<OpenWithVsCode site={site} />
	));

}
