/**
 * 
 */
Ext.application({
    name: 'ConfigEdit',
    appFolder: '../ConfigEdit',
    autoCreateViewport: true,
	models : ['crossSetting'],
	stores : ['crossSetting'],
	views : ['Viewport'],
	controllers : ['ConfigEditControl']
});
