/**
 * 
 */
Ext.define('initSet.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [],
	layout : 'fit',
	items : [ {
		xtype : 'panel',
		id : 'initSetForm',
		title : '系統初始化設定',
		frame : true,
		items : [ {
			xtype : 'label',
			text : '系統註冊及eSOP系統設定只能從127.0.0.1 登入設定'
		}, {
			xtype : 'fieldset',
			layout : 'column',
			border : false,
			margin : '15 0 0 0',
			items : [ {
				xtype : 'label',
				text : '請選擇語系',
				margin : '2 0 0 150'
			},{
				xtype : 'combobox',
				id : 'language',
				margin : '0 0 0 5',
				width : 180,
				editable : false
			} ]
		}, {
			xtype : 'fieldset',
			layout : 'hbox',
			border : false,
			margin : '5 0 0 0',
			items : [ {
				xtype : 'label',
				text : '目前登入ip',
				margin : '2 0 0 150'
			},{
				xtype : 'textfield',
				id : 'CurrentIP',
				margin : '0 0 0 8',
				width : 250,
				readOnly : true
			} ]
		}, {
			xtype : 'fieldset',
			layout : 'hbox',
			border : false,
			margin : '5 0 0 0',
			items : [ {
				xtype : 'label',
				text : 'eSOP主機是否安裝在VM環境下',
				margin : '2 0 0 43'
			},{
				xtype : 'textfield',
				id : 'isVM',
				margin : '0 0 0 8',
				width : 250,
				readOnly : true
			} ]
		}, {
			xtype : 'fieldset',
			layout : 'hbox',
			border : false,
			margin : '5 0 0 0',
			items : [ {
				xtype : 'label',
				text : '主機設備的機碼為',
				margin : '2 0 0 112'
			},{
				xtype : 'textfield',
				id : 'hardwareCode',
				margin : '0 0 0 8',
				width : 250,
				readOnly : true
			} ]
		} ]
	} ],
	buttons: [
	          { text: 'Button 1' },
	          { text: 'Button 2' },
	          { text: 'Button 3' }
	        ]
});