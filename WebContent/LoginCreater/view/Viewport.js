/**
 * 
 */
Ext.define('LoginCreater.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [],
	layout : 'fit',
	items : [ {
		xtype : 'tabpanel',
		id : 'LoginCreaterTabpanel',
		activeTab : 0,
		width : '100%',
		items : [ {
			xtype : 'form',
			id : 'browseForm',
			title : '資料瀏覽',
			frame : true,
			tbar : [ {
				xtype : 'label',
				text : '條件 :',
				width : 35
			}, {
				id : 'excolCombobox',
				itemId : 'excolCombobox',
				xtype : 'combobox',
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true,
				editable : false,
				displayField : 'name',
				valueField : 'value'
			}, {
				id : 'exconCombobox',
				xtype : 'combobox',
				width : 90,
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true,
				editable : false,
				displayField : 'name',
				valueField : 'value'
			}, {
				id : 'exstandardTextField',
				itemId : 'exstandardTextField',
				xtype : 'textfield',
				width : 150
			}, {
				id : 'exstandardNumField',
				itemId : 'exstandardNumField',
				xtype : 'numberfield',
				width : 150
			}, {
				id : 'exstandardDateField',
				itemId : 'exstandardDateField',
				xtype : 'datefield',
				format : 'Y-m-d',
				typeAhead : true,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true,
				width : 150
			}, {
				xtype : 'button',
				text : '查詢',
				id : 'search',
				iconCls : 'icon-query'
			}
//			, {
//				xtype : 'button',
//				text : '進階',
//				action : 'exsearch',
//				iconCls : 'FilterDown'
//			}, {
//				xtype : 'button',
//				text : '載入設定',
//				action : 'undoset',
//				iconCls : 'undo'
//			}, {
//				xtype : 'button',
//				text : '儲存檢視',
//				action : 'standardsave',
//				iconCls : 'SaveBlue'
//			}, {
//				xtype : 'button',
//				text : '儲存條件',
//				action : 'savecondition',
//				iconCls : 'SaveGreen'
//			}, {
//				id : 'setBtn',
//				xtype : 'button',
//				text : '進階設定',
//				action : 'set',
//				iconCls : 'Options3'
//			} 
			],
			items : [ {
				xtype : 'gridpanel',
				id : 'browseGridPanel',
				store : 'browseJsonStore',
				frame : true,
				autoScroll : true,
				columnLines : true,
				columns : [ {
					header : '登入者代號',
					dataIndex : 'AUTH_ID',
					width : 150
				}, {
					header : '名稱',
					dataIndex : 'AUTH_NAME',
					width : 150
				}, {
					header : '密碼',
					dataIndex : 'AUTH_PASSWORD',
					width : 150,
					hidden : true
				} ]
			} ]
		}, {
			xtype : 'form',
			id : 'detailForm',
			title : '詳細欄位',
			frame : true,
			tbar : [{
				xtype : 'button',
				text : '上一筆',
				id : 'previous',
				iconCls : 'icon-previous'
			},{
				xtype : 'button',
				text : '下一筆',
				id : 'next',
				iconCls : 'icon-next'
			},{
				xtype : 'button',
				text : '新增',
				id : 'add',
				iconCls : 'icon-add'
			},{
				xtype : 'button',
				text : '修改',
				id : 'modi',
				iconCls : 'icon-update'
			},{
				xtype : 'button',
				text : '刪除',
				id : 'delete',
				iconCls : 'icon-delete'
			},{
				xtype : 'button',
				text : '儲存',
				id : 'save',
				iconCls : 'icon-select',
				disabled : true
			},{
				xtype : 'button',
				text : '取消',
				id : 'cancel',
				iconCls : 'icon-cancel',
				disabled : true
			}],
			items : [{
				xtype : 'textfield',
				fieldLabel : '登入者代號',
				id : 'AUTH_ID',
				labelAlign : "left",
				labelWidth : 80,
				anchor : "25%",
				allowBlank : false,
				disabled : true,
				margin : '10 0 0 0'
			},{
				xtype : 'textfield',
				fieldLabel : '名稱',
				id : 'AUTH_NAME',
				labelAlign : "left",
				labelWidth : 80,
				anchor : "25%",
				disabled : true,
				margin : '5 0 0 0'
			},{
				xtype : 'textfield',
				fieldLabel : '密碼',
				id : 'AUTH_PASSWORD',
				inputType : "password",
				labelAlign : "left",
				labelWidth : 80,
				anchor : "25%",
				disabled : true,
				margin : '5 0 0 0'
			}]
		} ]
	} ]
});