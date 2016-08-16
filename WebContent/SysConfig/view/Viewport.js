/**
 * 
 */
Ext.define('SysConfig.view.Viewport',{
	extend : 'Ext.container.Viewport',
	requires : [],
	layout : 'fit',
	items : [{
		xtype : 'panel',
		id : 'SysConfigPanel',
		frame : true,
		border : false,
		manageHeight : false,
		tbar : [ {
			xtype : 'button',
			text : '儲存設定',
			id : 'SysConfigSave',
			border : 1,
			iconCls : 'icon-save'
		}],
		items : [ {
			xtype : 'gridpanel',
			id : 'SysConfigGrid',
			store : 'SysConfig',
			selType : 'cellmodel',
			columnLines : true,
			columns : [ {
				header : '設定說明',
				dataIndex : 'CD001',
				width : 300,
				renderer: function(val, metaData){
			       if(val == "logOffUserPw")val='踢除使用者密碼'
			       else if(val == "eSOPFileRoute")val='實體檔案路徑'
		    	   else if(val == "maxInactiveInterval")val='前端閒置超過時間自動登出eSOP(單位：分鐘)'
	    		   else if(val == "checkFileInterval")val='工位檢查推播間隔(秒)'
				    
	    		   return val;
				}
			}, {
				header : '值',
				dataIndex : 'CD003',
				width : 250,
				renderer: function(val, metaData){
				    return val;
				},
                getEditor: function (record,defaultField) {
                	var CD001 = record.get('CD001');
                	if(CD001 == 'maxInactiveInterval' || CD001 == 'checkFileInterval'){
                		return Ext.create('Ext.grid.CellEditor', {
                            field: {
                            	xtype : 'numberfield'
                            }
                        });
                	}else{
                		return Ext.create('Ext.grid.CellEditor', {
                            field: {
                                xtype: 'textfield'
                            }
                        });
                	}
                }
			} ],
			plugins : [ {
				ptype : 'cellediting',
				clicksToEdit : 1
			} ]
		}]
	}]
});