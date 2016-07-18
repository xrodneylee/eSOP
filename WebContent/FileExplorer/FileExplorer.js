/**
 * 
 */
Ext.application({
    name: 'FileExplorer',
    appFolder: '../FileExplorer',
    autoCreateViewport: true,
	models : ['browseModel'],
	stores : ['browseJsonStore'],
	views : ['Viewport'],
	controllers : ['FileExplorerControl']
});