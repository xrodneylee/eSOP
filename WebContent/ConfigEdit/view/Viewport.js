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
					xtype : 'panel',
					id : 'crossSetting',
					title : 'CROSS整合設定',
					frame : true,
					border : false,
					manageHeight : false,
					tbar : [ {
						xtype : 'button',
						text : '儲存設定',
						id : 'crossSettingSave',
						border : 1,
						iconCls : 'icon-save'
					}, {
						xtype : 'button',
						text : '返回設定主頁',
						id : 'crossSettingUndo',
						border : 1,
						iconCls : 'icon-refresh'
					} ],
					items : [ {
						xtype : 'gridpanel',
						id : 'crossSettingGrid',
						store : 'crossSetting',
						selType : 'cellmodel',
						height : 500,
						columns : [ {
							header : '設定說明',
							dataIndex : 'CD001',
							width : 200,
							renderer: function(val, metaData){
						       if(val == "CROSSEncodingState")val='是否整合 CROSS'
						       else if(val == "CROSSHostIP")val='CROSS 主機 IP 位置'
					    	   else if(val == "CROSSHostPORT")val='CROSS 主機 PORT'
							    
				    		   return val;
							},
						}, {
							header : '值',
							dataIndex : 'CD003',
							width : 150,
							renderer: function(val, metaData){
							    var CD001 = metaData.record.get('CD001');
							    if(CD001 == 'CROSSEncodingState'){
							       if(val == "-1")val='否';
							       else val='是';
							    }
							    return val;
							},
		                    getEditor: function (record,defaultField) {
		                    	var CD001 = record.get('CD001');
		                    	if(CD001 == 'CROSSEncodingState'){
		                    		return Ext.create('Ext.grid.CellEditor', {
			                            field: {
			                            	xtype : 'combo',
			                    			name : 'yesNo-'+CD001,
			                    			mode : 'local',
			                    			store : new Ext.data.ArrayStore({
			                    				fields : [ 'id', 'name' ],
			                    				data : [ [ '-1', '否' ], [ '0', '是' ] ]
			                    			}),
			                    			valueField : 'id',
			                    			displayField : 'name',
			                    			editable : false,
			                    			typeAhead : true,
			                    			selectOnFocus : true,
			                    			forceSelection: true
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
					items : [{
						xtype : 'textfield',
						fieldLabel : '主機 IP',
						id : 'APIP',
						labelAlign : "right",
						labelWidth : 120,
						anchor : "30%",
						allowBlank : false,
						disabled : true,
						margin : '10 0 0 0',
						value : getGuardManagerNetCard
					},{
						xtype : 'textfield',
						fieldLabel : 'Guard Manager IP',
						id : 'GuardManagerIP',
						labelAlign : "right",
						labelWidth : 120,
						anchor : "30%",
						allowBlank : false,
						disabled : true,
						margin : '5 0 0 0',
						value : getGuardManagerIP
					},{
						xtype : 'textfield',
						fieldLabel : 'Guard Manager Port',
						id : 'GuardManagerPort',
						labelAlign : "right",
						labelWidth : 120,
						anchor : "30%",
						allowBlank : false,
						disabled : true,
						margin : '5 0 0 0',
						value : getGuardManagerPort
					},{
						xtype : 'textfield',
						fieldLabel : '硬體資訊',
						id : 'MachineCode',
						labelAlign : "right",
						labelWidth : 120,
						anchor : "30%",
						allowBlank : false,
						disabled : true,
						margin : '5 0 0 0',
						value : getHardwareKey
					}]
				} ]
	} ]
});