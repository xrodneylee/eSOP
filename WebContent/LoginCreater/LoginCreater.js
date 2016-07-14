/**
 * 
 */
Ext.application({
    name: 'LoginCreater',
    appFolder: '../LoginCreater',
    autoCreateViewport: true,
	models : ['browseModel'],
	stores : ['browseJsonStore'],
	views : ['Viewport'],
	controllers : ['LoginCreaterControl']
});
