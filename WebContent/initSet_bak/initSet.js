/**
 * 
 */
Ext.onReady(function(){
	var vpWidth_c1 =Ext.getBody().getViewSize().width;
	var vpHeight_c1 =Ext.getBody().getViewSize().height;
	
	var integrateStore = Ext.create('Ext.data.Store', {
	    fields: ['value', 'name'],
	    data : [
	        {"value":"1", "name":"SFT"},
	        {"value":"2", "name":"MES"},
	        {"value":"3", "name":"ERP"}
	    ]
	});

	var integrate = Ext.create('Ext.form.ComboBox', {
		id : 'integrate',
	    fieldLabel: '整合系統',
	    store: integrateStore,
	    queryMode: 'local',
	    displayField: 'name',
	    valueField: 'value',
	    editable: false,
		disabled:true
	});
	
	var firstTab = Ext.create('Ext.form.Panel',{
		title : "eSOP 系統環境設定",
		frame : true,
		id : 'firstTab',
		bodyPadding : 10,
		fieldDefaults : {
			labelAlign : "right",
			labelWidth : 120,
			anchor : "35%"
		},
		items : [ {
			xtype : "textfield",
			name : "databaseName",
			id : "databaseName",
			fieldLabel : "eSOP 資料庫名稱",
			allowBlank : false,
			disabled:true
		}, {
			xtype : "textfield",
			name : "databaseUsername",
			id : "databaseUsername",
			fieldLabel : "資料庫帳號 ",
			allowBlank : false,
			disabled:true
		}, {
			xtype : "textfield",
			name : "databasePassword",
			id : "databasePassword",
			inputType : "password",
			fieldLabel : "資料庫密碼 ",
			allowBlank : false,
			disabled:true
		}, {
			xtype : "textfield",
			name : "databaseIp",
			id : "databaseIp",
			fieldLabel : "資料庫 Server IP",
			allowBlank : false,
			disabled:true
		}, integrate ],
		tbar : [{
			text : "修改",
			iconCls : 'icon-list',
			handler : modify
		},{
			text : "儲存",
			id : "save",
			disabled : true,
			iconCls : 'icon-save',
			handler : save
		},{
			text : "資料庫連線測試",
			iconCls : 'icon-list',
			handler : connectionTest
		},{
			text : "返回設定主頁",
			iconCls : 'icon-refresh',
			handler : function() {
				
			}
		}]
	});
	getInitData();
	
	Ext.create('Ext.data.Store', {
	    storeId:'secondTabStore',
	    fields:['CD001', 'CD003'],
	    proxy: {
	        type: 'memory',
	        reader: {
	            type: 'json',
	            root: 'CONFIG'
	        }
	    }
	});
	
	var secondTab = Ext.create('Ext.grid.Panel', {
		id : 'secondTab',
	    title: '整合設定',
	    height: 200,
	    width: 400,
	    store: Ext.data.StoreManager.lookup('secondTabStore'),
	    columns: [
	        {header: '設定說明', width:300, dataIndex: 'CD001'},
	        {
	        	header: '值',
	        	id: 'CD003',
	        	width:200,
	        	field: 'textfield', 
	        	dataIndex: 'CD003'
	        }
	    ],
	    selType: 'cellmodel',
	    plugins: [
	        Ext.create('Ext.grid.plugin.CellEditing', {
	            clicksToEdit: 1,
	            listeners: {
//	            	edit :cd001Edit
	        		beforeedit : cd001Edit
	    	    }
	        })
	    ]
	});
	getConfigData();
	
	Ext.create('Ext.tab.Panel',{
		activeTab : 0,
        width : vpWidth_c1,
        height : vpHeight_c1,
		items : [firstTab,secondTab],
	    renderTo : Ext.getBody()
	});
});