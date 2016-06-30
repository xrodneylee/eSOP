/**
 * 
 */
Ext.onReady(function(){
	var vpWidth_c1 =Ext.getBody().getViewSize().width;
	var vpHeight_c1 =Ext.getBody().getViewSize().height;
	
	var eSopSetting = Ext.create('Ext.form.Panel',{
		title : "eSOP 系統環境設定",
		bodyPadding : 10,
		fieldDefaults : {
			labelAlign : "right",
			labelWidth : 120,
			anchor : "35%"
		},
		items : [ {
			xtype : "textfield",
			name : "databaseName",
			fieldLabel : "eSOP 資料庫名稱",
			allowBlank : false
		}, {
			xtype : "textfield",
			name : "databaseUsername",
			fieldLabel : "資料庫帳號 ",
			allowBlank : false
		}, {
			xtype : "textfield",
			name : "databasePassword",
			inputType : "password",
			fieldLabel : "資料庫密碼 ",
			allowBlank : false
		}, {
			xtype : "textfield",
			name : "databaseIp",
			fieldLabel : "資料庫 Server IP",
			allowBlank : false
		}, {
			xtype : "textfield",
			name : "Integrate",
			fieldLabel : "整合系統",
			allowBlank : false
		} ],
		tbar : [{
			text : "修改",
			iconCls : 'ExitDoor2',
			handler : function() {
				
			}
		},{
			text : "儲存",
			formBind : true,
			iconCls : 'ExitDoor2',
			handler : function() {
				
			}
		},{
			text : "資料庫連線測試",
			iconCls : 'ExitDoor2',
			handler : function() {
				
			}
		},{
			text : "返回設定主頁",
			formBind : true,
			iconCls : 'ExitDoor2',
			handler : function() {
				
			}
		}]
	});
	
	Ext.create('Ext.tab.Panel',{
		activeTab : 0,
        width : vpWidth_c1,
        height : vpHeight_c1,
		items : [eSopSetting],
	    renderTo : Ext.getBody()
	});
});