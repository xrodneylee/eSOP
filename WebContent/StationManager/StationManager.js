/**
 * 
 */
Ext.application({
    name: 'StationManager',
    appFolder: '../StationManager',
    autoCreateViewport: true,
	models : ['browseModel'],
	stores : ['browseJsonStore'],
	views : ['Viewport'],
	controllers : ['StationManagerControl']
});