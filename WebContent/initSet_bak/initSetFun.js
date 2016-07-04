/**
 * 
 */
function modify() {
	Ext.getCmp('databaseName').setDisabled(false);
	Ext.getCmp('databaseUsername').setDisabled(false);
	Ext.getCmp('databasePassword').setDisabled(false);
	Ext.getCmp('databaseIp').setDisabled(false);
	Ext.getCmp('integrate').setDisabled(false);
	Ext.getCmp('save').setDisabled(false);
}

function save() {
	var dataSource = new Object();
	dataSource.DatabaseUsername = Ext.getCmp('databaseUsername').getValue();
	dataSource.DatabasePassword = Ext.getCmp('databasePassword').getValue();
	dataSource.DatabaseIp = Ext.getCmp('databaseIp').getValue();
	dataSource.DatabaseName = Ext.getCmp('databaseName').getValue();
	dataSource.Integrate = Ext.getCmp('integrate').getValue();
	
	Ext.Ajax.request({
		waitMsg: 'Please wait...',
		url : '/eSOP/api/ajax/saveDataSource',
	    method : "POST",
	    params :{
			data : Ext.encode(dataSource)
		},
	    success : function (response) {
	    	response = Ext.decode(response.responseText);
	    	if(response.result == "success"){
	    		Ext.getCmp('databaseName').setDisabled(true);
	    		Ext.getCmp('databaseUsername').setDisabled(true);
	    		Ext.getCmp('databasePassword').setDisabled(true);
	    		Ext.getCmp('databaseIp').setDisabled(true);
	    		Ext.getCmp('integrate').setDisabled(true);
	    		Ext.getCmp('save').setDisabled(true);
	    		Ext.Msg.alert('更新完成','SQL SERVER IP設定完成，請重新啟動eSOP伺服器');
	    	}else{
	    		Ext.Msg.alert('更新失敗',response.msg);
	    	}
	    },
	    failure : function (response) {
	    	Ext.Msg.alert('','儲存失敗');
	    }
	});
}

function getInitData(){
	Ext.Ajax.request({
		waitMsg: 'Please wait...',
		url : '/eSOP/api/ajax/getInitData',
	    method : "POST",
	    success : function (response) {
	    	response = Ext.decode(response.responseText);
	    	Ext.getCmp('databaseName').setValue(response.DatabaseName);
	    	Ext.getCmp('databaseUsername').setValue(response.DatabaseUsername);
	    	Ext.getCmp('databasePassword').setValue(response.DatabasePassword);
	    	Ext.getCmp('databaseIp').setValue(response.DatabaseIp);
	    	Ext.getCmp('integrate').setValue(response.Integrate);
	    },
	    failure : function (response) {
	    	Ext.Msg.alert('','初始化失敗');
	    }
	});
}

function getConfigData(){
	Ext.Ajax.request({
		waitMsg: 'Please wait...',
		url : '/eSOP/api/ajax/getConfigData',
	    method : "POST",
	    success : function (response) {
	    	response = Ext.decode(response.responseText);
	    	Ext.data.StoreManager.lookup('secondTabStore').loadData(response.CONFIG,true);
	    },
	    failure : function (response) {
	    	Ext.Msg.alert('','初始化失敗');
	    }
	});
}

function connectionTest(){
	Ext.Ajax.request({
		waitMsg: 'Please wait...',
		url : '/eSOP/api/ajax/connectionTest',
	    method : "POST",
	    success : function (response) {
	    	if(response.responseText == "1"){
	    		Ext.Msg.alert('','連線成功');
	    	}else{
	    		Ext.Msg.alert('','連線失敗');
	    	}
	    },
	    failure : function (response) {
	    	Ext.Msg.alert('','連線失敗');
	    }
	});
}

function cd001Edit(editor,e,eOpts){
	
	if(e.record.get("CD001") == "CROSSEncodingState"){
		var states = Ext.create('Ext.data.Store', {
		    fields: ['value', 'name'],
		    data : [
		        {"value":"-1", "name":"否"},
		        {"value":"0", "name":"是"}
		    ]
		});

		var aaa = Ext.create('Ext.form.field.ComboBox', {
	        store: states,
	        queryMode: 'local',
	        displayField: 'name',
	        valueField: 'abbr',
	        editable: false
		});
		Ext.getCmp('CD003').setEditor(aaa);
	}else{
		 Ext.getCmp('CD003').setEditor(new Ext.form.field.Text());
	}
}