/**
 * 
 */
Ext.define('Authorization.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [],
	layout : 'fit',
	items : [ {
		xtype : 'panel',
		tbar : [{
			xtype : 'button',
			text : '返回設定主頁',
			id : 'undo',
			border : 1,
			iconCls : 'icon-refresh'
		}],
		items : [{
			xtype : 'panel',
			title : 'Step1.新增序號',
			layout:'column',
			items : [{
				xtype : 'textfield',
				fieldLabel : '序號',
				id : 'serial',
				labelAlign : "right",
				labelWidth : 65,
				width : 400,
				margin : '10 0 10 5'
			},{
				xtype : 'button',
				text : '新增',
				id : 'serialsave',
				border : 1,
				iconCls : 'icon-select',
				margin : '10 0 10 0'
			}]
		},{
			xtype : 'panel',
			id : 'Step2Panel',
			title : 'Step2.輸入執行碼',
			items : [{
				xtype : 'combobox',
				id : 'serialCombo',
				fieldLabel : '選擇序號',
				labelAlign : "right",
				labelWidth : 65,
				width : 400,
				margin : '10 0 10 5',
				displayField: 'terms',
				valueField: 'value',
				typeAhead : true,
				readOnly : true,
				mode: 'local',
				triggerAction: 'all',
				selectOnFocus:true,
				store : 'serialComboStore'
			},{
				xtype : 'textfield',
				id:'regId',
				fieldLabel : '機碼',
	            readOnly : true,
				labelAlign : "right",
				labelWidth : 65,
				width : 400,
				margin : '0 0 10 5'
			},{
		    	 layout:'column',
		    	 border: false,
		         items:[{
						xtype : 'textfield',
						id:'execId',
						fieldLabel : '執行碼',
						labelAlign : "right",
						labelWidth : 65,
						width : 400,
						margin : '0 0 10 5'
					},{
		          		xtype : 'button',
		          		id : 'regsave',
		          		text : '授權',
						iconCls: 'icon-select',
						margin : '0 0 10 0'
			          }
		         ]
	    	}]
		},{
			xtype : 'gridpanel',
			title : '可使用模組',
			id : 'moduleGridPanel',
			store : 'moduleJsonStore',
			frame : true,
			autoScroll : true,
			columnLines : true,
			stripeRows: true,
			height : 200,
			columns : [ {
				header : '模組名稱',
				dataIndex : 'type',
				width : 250
			}, {
				header : '可使用否',
				dataIndex : 'canuse',
				width : 150
			}, {
				header : '使用期限',
				dataIndex : 'deadline',
				width : 150
			} ]
		},{
			xtype : 'gridpanel',
			title : '已安裝序號',
			id : 'serialGridPanel',
			store : 'serialJsonStore',
			frame : true,
			autoScroll : true,
			columnLines : true,
			stripeRows: true,
			height : 200,
			columns : [ {
				header : '序號',
				dataIndex : 'serialId',
				width : 250
			}, {
				header : '人數',
				dataIndex : 'uQty',
				width : 150
			}, {
				header : '使用期限',
				dataIndex : 'userDate',
				width : 150
			}, {
				header : '序號用途(正式/借貨)',
				dataIndex : 'serialType',
				width : 150
			}, {
				header : '是否註冊執行碼',
				dataIndex : 'isRegExecID',
				width : 150
			}, {
				header : '是否已授權',
				dataIndex : 'isAuth',
				width : 150,
				hidden : true
			}, {
				header : '授權狀態',
				dataIndex : 'authStates',
				width : 150
			} ]
		}]
	}]
});