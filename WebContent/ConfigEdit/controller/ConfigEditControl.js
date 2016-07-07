/**
 * 
 */
Ext.define('ConfigEdit.controller.ConfigEditControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#configEditTabpanel' : {
				afterrender : this.onTabpanelAfterrender
			},
			'#modi' : {
				click : this.modi
			},
			'#save' : {
				click : this.save
			},
			'#connectionTest' : {
				click : this.connectionTest
			},
			'#undo, #undo_, #vmUndo' : {
				click : this.undo
			}
		});
	},
	modi : function(){
		Ext.getCmp('databaseName').setDisabled(false);
		Ext.getCmp('databaseUsername').setDisabled(false);
		Ext.getCmp('databasePassword').setDisabled(false);
		Ext.getCmp('databaseIp').setDisabled(false);
		Ext.getCmp('integrateCombo').setDisabled(false);
		Ext.getCmp('save').setDisabled(false);
	},
	save : function(){
		var dataSource = new Object();
		dataSource.DatabaseUsername = Ext.getCmp('databaseUsername').getValue();
		dataSource.DatabasePassword = Ext.getCmp('databasePassword').getValue();
		dataSource.DatabaseIp = Ext.getCmp('databaseIp').getValue();
		dataSource.DatabaseName = Ext.getCmp('databaseName').getValue();
		dataSource.Integrate = Ext.getCmp('integrateCombo').getValue();
		
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
		    		Ext.getCmp('integrateCombo').setDisabled(true);
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
	},
	connectionTest : function(){
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
	},
	onTabpanelAfterrender : function(component, eOpts){
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
		    	Ext.getCmp('integrateCombo').setValue(response.Integrate);
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','初始化失敗');
		    }
		});
	},
	undo : function(){
		window.location.replace("/eSOP/InitSet.jsp");
	}
});