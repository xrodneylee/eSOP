/**
 * 
 */
Ext.define('ConfigEdit.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [],
	layout : 'fit',
	items : [ {
		id : 'configEditTabpanel',
		xtype : 'tabpanel',
		border : false,
		layout : 'fit',
		activeTab : 0,
		items : [
				{
					xtype : 'form',
					id : 'envSetting',
					title : 'eSOP 系統環境設定',
					frame : true,
					border : false,
					manageHeight : false,
					tbar : [ {
						xtype : 'button',
						text : '修改',
						id : 'modi',
						border : 1,
						iconCls : 'icon-list'
					}, {
						xtype : 'button',
						text : '儲存',
						id : 'save',
						border : 1,
						iconCls : 'icon-save'
					}, {
						xtype : 'button',
						text : '資料庫連線測試',
						id : 'connectionTest',
						border : 1,
						iconCls : 'icon-list'
					}, {
						xtype : 'button',
						text : '返回設定主頁',
						id : 'undo',
						border : 1,
						iconCls : 'icon-refresh'
					} ],
					items : [
							{
								xtype : 'textfield',
								fieldLabel : 'eSOP 資料庫名稱',
								id : 'databaseName',
								labelAlign : "right",
								labelWidth : 120,
								anchor : "35%",
								allowBlank : false,
								disabled : true,
								margin : '10 0 0 0'
							},
							{
								xtype : 'textfield',
								fieldLabel : '資料庫帳號',
								id : 'databaseUsername',
								labelAlign : "right",
								labelWidth : 120,
								anchor : "35%",
								allowBlank : false,
								disabled : true,
								margin : '5 0 0 0'
							},
							{
								xtype : 'textfield',
								fieldLabel : '資料庫密碼',
								id : 'databasePassword',
								inputType : "password",
								labelAlign : "right",
								labelWidth : 120,
								anchor : "35%",
								allowBlank : false,
								disabled : true,
								margin : '5 0 0 0'
							},
							{
								xtype : 'textfield',
								fieldLabel : '資料庫 Server IP',
								id : 'databaseIp',
								labelAlign : "right",
								labelWidth : 120,
								anchor : "35%",
								allowBlank : false,
								disabled : true,
								margin : '5 0 0 0'
							},
							{
								xtype : 'combobox',
								id : 'integrateCombo',
								fieldLabel : '整合系統',
								labelAlign : "right",
								labelWidth : 120,
								typeAhead : true,
								selectOnFocus : true,
								editable : false,
								disabled : true,
								anchor : "35%",
								margin : '5 0 0 0',
								store : [ [ 'SFT', 'SFT' ], [ 'MES', 'MES' ],
										[ 'ERP', 'ERP' ] ]
							} ]
				}, {
					xtype : 'form',
					id : 'crossSetting',
					title : 'CROSS整合設定',
					frame : true,
					border : false,
					manageHeight : false,
					tbar : [ {
						xtype : 'button',
						text : '儲存設定',
						id : 'save_',
						border : 1,
						iconCls : 'icon-save'
					}, {
						xtype : 'button',
						text : '返回設定主頁',
						id : 'undo_',
						border : 1,
						iconCls : 'icon-refresh'
					} ],
					items : []
				}, {
					xtype : 'form',
					id : 'vmSetting',
					title : '虛擬機器安裝設定',
					frame : true,
					border : false,
					manageHeight : false,
					tbar : [ {
						xtype : 'button',
						text : '儲存',
						id : 'vmSave',
						border : 1,
						iconCls : 'icon-save'
					}, {
						xtype : 'button',
						text : '返回設定主頁',
						id : 'vmUndo',
						border : 1,
						iconCls : 'icon-refresh'
					}, {
						xtype : 'button',
						text : '執行',
						id : 'vmExecute',
						border : 1,
						iconCls : 'icon-refresh'
					} ],
					items : []
				} ]
	} ]
});