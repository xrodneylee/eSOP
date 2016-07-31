/**
 * 
 */
Ext.application({
    name: 'OnlineUser',
    appFolder: '../OnlineUser',
    autoCreateViewport: true,
	models : ['browseModel'],
	stores : ['browseJsonStore'],
	views : ['Viewport'],
	controllers : ['OnlineUserControl']
});