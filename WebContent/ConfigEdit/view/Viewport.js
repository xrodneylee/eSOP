/**
 * 
 */
Ext.define('ConfigEdit.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [],
	layout : 'fit',
	items : [ {
		id : 'envStabpanel',
		xtype : 'tabpanel',
		border : false,
		layout : 'fit',
		activeTab : 0,
		items : [ {
			xtype : 'form',
			id : 'envSetting',
			title : 'eSOP 系統環境設定',
			frame : true,
			border : false,
			manageHeight : false,
			items : [
			         
			         ]
		} ]
	} ]
});