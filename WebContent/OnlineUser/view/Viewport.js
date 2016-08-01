/**
 * 
 */
var vpHeight_c1 =Ext.getBody().getViewSize().height;
Ext.define('OnlineUser.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [],
	layout : 'fit',
	items : [ {
		xtype : 'panel',
		frame : true,
		items : [ {
			xtype : 'fieldset',
			title : '授權人數',
			layout : 'vbox',
			items : [ {
				layout : 'column',
				border : false,
				frame : true,
				style : 'border-width: 0px;',
				items : [ {
					xtype : 'textfield',
					id : 'authorized',
					fieldLabel : 'eSOP 使用者',
					labelWidth : 100,
					labelAlign : 'right',
					readOnly : true,
					width : 200
				}]
			}]
		},{
			xtype : 'fieldset',
			title : '已使用授權人數',
			layout : 'vbox',
			items : [ {
				layout : 'column',
				border : false,
				frame : true,
				style : 'border-width: 0px;',
				items : [ {
					xtype : 'textfield',
					id : 'users',
					fieldLabel : 'eSOP 使用者',
					labelWidth : 100,
					labelAlign : 'right',
					readOnly : true,
					width : 200
				}]
			}]
		}, {
			xtype : 'gridpanel',
			id : 'browseGridPanel',
			title : '目前登入者資訊',
			store : 'browseJsonStore',
			frame : true,
			autoScroll : true,
			columnLines : true,
			height : vpHeight_c1/4*3+10,
			tbar : [ {
				xtype : 'button',
				text : '踢除使用者',
				id : 'remove',
				iconCls : 'icon-list'
			}],
			selModel: {
		        selType: 'checkboxmodel',
		        showHeaderCheckbox: true
		    },
			columns : [ {
				xtype : 'rownumberer'
			}, {
				header : '登入帳號',
				dataIndex : 'OU001',
				width : 150
			}, {
				header : '登入編號',
				dataIndex : 'OU002',
				width : 200
			}, {
				header : '登入類別',
				dataIndex : 'OU003',
				width : 150
			}, {
				header : '登入時間',
				dataIndex : 'OU004',
				width : 200
			}, {
				header : '最後活躍時間',
				dataIndex : 'OU005',
				width : 200
			}, {
				header : 'session_ID',
				dataIndex : 'OU006',
				width : 250
			}]
		} ]
	} ]
});