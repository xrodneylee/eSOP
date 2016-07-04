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
			items : [ {
				xtype : 'fieldset',
				layout : 'hbox',
				border : false,
				items : [ {
					xtype : 'triggerfield',
					fieldLabel : '員工代號',
					id : 'userId',
					editable : false,
					triggerClass : 'x-form-search-trigger'
				}, {
					xtype : 'label',
					id : 'userName',
					margin : '3 0 0 10'
				} ]
			} ]
		} ]
	} ]
});