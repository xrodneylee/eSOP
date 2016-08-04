/**
 * 
 */
var vpHeight_c1 =Ext.getBody().getViewSize().height;
Ext.define('FileExplorer.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [],
	layout : 'fit',
	items : [ {
		xtype : 'panel',
		frame : true,
		items : [ {
			xtype : 'fieldset',
			title : '查詢區',
			layout : 'vbox',
			items : [ {
				layout : 'column',
				border : false,
				frame : true,
				style : 'border-width: 0px;',
				items : [ {
					xtype : 'triggerfield',
					id : 'SP003',
					fieldLabel : '實體檔名',
					labelWidth : 100,
					labelAlign : 'right',
					editable : false,
					width : 300,
					triggerCls : 'x-form-search-trigger'
				}, {
					xtype : 'triggerfield',
					id : 'SP001',
					fieldLabel : '編號',
					labelWidth : 100,
					labelAlign : 'right',
					editable : false,
					width : 300,
					triggerCls : 'x-form-search-trigger'
				}, {
					xtype : 'triggerfield',
					id : 'AL002@1',
					fieldLabel : '品號',
					labelWidth : 100,
					labelAlign : 'right',
					width : 300,
					triggerCls : 'x-form-search-trigger'
				} ]
			}, {
				layout : 'column',
				border : false,
				frame : true,
				style : 'border-width: 0px;',
				items : [ {
					xtype : 'triggerfield',
					id : 'AL002@2',
					fieldLabel : '作業',
					labelWidth : 100,
					labelAlign : 'right',
					width : 300,
					triggerCls : 'x-form-search-trigger'
				}, {
					xtype : 'textfield',
					id : 'SP004',
					fieldLabel : '說明',
					labelWidth : 100,
					labelAlign : 'right',
					width : 300
				}, {
					xtype : 'triggerfield',
					id : 'AL002@3',
					fieldLabel : '廠區',
					labelWidth : 100,
					labelAlign : 'right',
					width : 300,
					triggerCls : 'x-form-search-trigger'
				} ]
			}, {
				layout : 'column',
				border : false,
				frame : true,
				style : 'border-width: 0px;',
				items : [ {
					xtype : 'datefield',
					id : 'start',
					fieldLabel : '檔案日期(起)',
					labelAlign : 'right',
					format : 'Y-m-d',
					width : 300
				}, {
					xtype : 'datefield',
					id : 'end',
					fieldLabel : '檔案日期(迄)',
					labelAlign : 'right',
					format : 'Y-m-d',
					width : 300
				}, {
					xtype : 'button',
					text : '清空',
					id : 'clean',
					width : 100,
					margin : '0 0 0 95'
				}, {
					xtype : 'button',
					text : '查詢',
					id : 'query',
					width : 100,
					margin : '0 0 0 10'
				} ]
			} ]
		}, {
			xtype : 'gridpanel',
			id : 'browseGridPanel',
			title : '資料區',
			store : 'browseJsonStore',
			frame : true,
			autoScroll : true,
			columnLines : true,
			height : vpHeight_c1/4*3+10,
			tbar : [ {
				xtype : 'button',
				text : '新增',
				id : 'add',
				iconCls : 'icon-add'
			}, {
				xtype : 'button',
				text : '刪除',
				id : 'delete',
				iconCls : 'icon-delete'
			}, {
				xtype : 'button',
				text : '儲存',
				id : 'save',
				iconCls : 'icon-save'
			}, {
				xtype : 'button',
				text : '匯出',
				id : 'export',
				iconCls : 'icon-export'
			}/*, {
				xtype : 'button',
				text : '匯入',
				id : 'import',
				iconCls : 'icon-import'
			} */],
			plugins : [ {
				ptype : 'cellediting',
				clicksToEdit : 1,
				listeners : {
					beforeedit: function(editor, e, eOpts){
						if(e.field == 'SP001' && e.record.get('exist') == 'Y'){
							e.cancel = true;
						}
						if(e.field == 'SP002' && e.record.get('exist') == 'Y'){
							e.cancel = true;
						}
					}
				}
			} ],
			selModel: {
		        selType: 'checkboxmodel',
		        showHeaderCheckbox: true
		    },
			columns : [ {
				header : '歸檔',
				dataIndex : 'exist',
				width : 40
			}, {
				header : '實體檔案',
				dataIndex : 'SP003',
				width : 150,
				editor : {
					xtype : 'triggerfield',
					id : 'SP003_editor',
					editable : false,
					triggerCls : 'x-form-search-trigger'
				}
			}, {
				header : '檔案日期',
				dataIndex : 'SP010',
				width : 150
			}, {
				header : '編號',
				dataIndex : 'SP001',
				width : 150,
				editor : {
					xtype : 'textfield'
				}
			}, {
				header : '版號',
				dataIndex : 'SP002',
				width : 150,
				editor : {
					xtype : 'textfield'
				}
			}, {
				header : '檢視',
				width : 150,
				renderer: function(val, metaData){
					return "<img src='/eSOP/sources/css/images/TaskList.gif'  onclick=\"viewSOPFN('"+metaData.record.get('SP003')+"')\" style='display:block; margin:auto'>";
				}
			}, {
				header : '說明',
				dataIndex : 'SP004',
				width : 150,
				editor : {
					xtype : 'textfield'
				}
			}, {
				header : '品號',
				dataIndex : 'SP005',
				width : 150,
				editor : {
					xtype : 'triggerfield',
					id : 'SP005_editor',
					triggerCls : 'x-form-search-trigger'
				}
			}, {
				header : '工序',
				dataIndex : 'SP007',
				width : 150,
				editor : {
					xtype : 'textfield'
				}
			}, {
				header : '作業',
				dataIndex : 'SP006',
				width : 150,
				editor : {
					xtype : 'triggerfield',
					id : 'SP006_editor',
					triggerCls : 'x-form-search-trigger'
				}
			}, {
				header : '順序',
				dataIndex : 'SP008',
				width : 150,
				editor : {
					xtype : 'numberfield'
				}
			}, {
				header : '廠區',
				dataIndex : 'SP009',
				width : 150,
				editor : {
					xtype : 'triggerfield',
					id : 'SP009_editor',
					triggerCls : 'x-form-search-trigger'
				}
			} ]
		} ]
	} ]
});