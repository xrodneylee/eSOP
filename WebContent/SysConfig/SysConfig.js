/**
 * 
 */
Ext.application({
    name: 'SysConfig',
    appFolder: '../SysConfig',
    autoCreateViewport: true,
	models : ['SysConfig'],
	stores : ['SysConfig'],
	views : ['Viewport'],
	controllers : ['SysConfigControl']
});