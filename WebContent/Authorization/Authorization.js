/**
 * 
 */
Ext.application({
    name: 'Authorization',
    appFolder: '../Authorization',
    autoCreateViewport: true,
	models : ['serialModel','moduleModel','serialComboModel'],
	stores : ['serialJsonStore','moduleJsonStore','serialComboStore'],
	views : ['Viewport'],
	controllers : ['AuthorizationControl']
});