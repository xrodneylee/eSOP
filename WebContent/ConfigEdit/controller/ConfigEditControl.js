/**
 * 
 */
var vpHeight_c1 =Ext.getBody().getViewSize().height;
Ext.define('ConfigEdit.controller.ConfigEditControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#envSetting' : {
				afterrender : this.onEnvSettingAfterrender
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
			'#undo,#crossSettingUndo,#vmUndo' : {
				click : this.undo
			},
			'#crossSettingSave' : {
				click : this.crossSettingSave
			},
			'#vmSetting' : {
				afterrender : this.onVmSettingAfterrender
			},
			'#vmExecute' : {
				click : this.onVmExecute
			},
			'#vmSave' : {
				click : this.onVmSave
			},
			'#crossSettingGrid' : {
				afterrender : this.crossSettingGridAfterrender
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
	onEnvSettingAfterrender : function(component, eOpts){
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
	},
	crossSettingSave : function(){
		var records = Ext.getCmp('crossSettingGrid').getStore().getRange();
		var updateData = new Object();
		var getCD001=new Array();
		var getCD003=new Array();
		for(var i=0;i<records.length;i++){
			getCD001[i]=records[i].get("CD001");
			getCD003[i]=records[i].get("CD003");
		}
		updateData.CD001 = getCD001;
		updateData.CD003 = getCD003;
		Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url : '/eSOP/api/ajax/saveConfigData',
		    method : "POST",
		    params :{
				data : Ext.encode(updateData)
			},
		    success : function (response) {
	    		Ext.Msg.alert('更新完成','更新完成');
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','儲存失敗');
		    }
		});
	},
	onVmSettingAfterrender : function(component, eOpts){
		if(isVm == 'false'){
			Ext.getCmp('vmSave').setDisabled(true);
			Ext.getCmp('vmExecute').setDisabled(true);
		}else{
			Ext.getCmp('APIP').setDisabled(false);
			Ext.getCmp('GuardManagerIP').setDisabled(false);
			Ext.getCmp('GuardManagerPort').setDisabled(false);
			Ext.getCmp('MachineCode').setDisabled(false);
		}
	},
	onVmExecute : function(){
		if(Ext.getCmp('APIP').getValue() == '' || Ext.getCmp('GuardManagerIP').getValue() == '' || Ext.getCmp('GuardManagerPort').getValue() == ''){
			Ext.Msg.alert('訊息','主機 IP、Guard Manager IP、Guard Manager Port不可空白');
		}else{
			Ext.Ajax.request({
				waitMsg : 'Please wait...',
				url : '/eSOP/api/ajax/getMachineNumber/'+Ext.getCmp('GuardManagerIP').getValue()+'/'+Ext.getCmp('APIP').getValue(),
				method : "GET",
				success : function(response) {
					if(response.responseText=="GuardService"){
		        		alert("Check connect Info");
		        	}else{
		        		Ext.getCmp("MachineCode").setValue(response.responseText);
		        	}
				}
			});
		}
	},
	onVmSave : function(){
		var updateData = new Object();
		var getCD001=new Array();
		var getCD003=new Array();
		getCD001[0]="GuardManagerIP";
		getCD003[0]=Ext.getCmp("GuardManagerIP").getValue();
		getCD001[1]="GuardManagerPort";
		getCD003[1]=Ext.getCmp("GuardManagerPort").getValue();
		getCD001[2]="HardwareKey";
		getCD003[2]=Ext.getCmp("MachineCode").getValue();
		getCD001[3]="GuardManagerNetCard";
		getCD003[3]=Ext.getCmp("APIP").getValue();
		updateData.CD001 = getCD001;
		updateData.CD003 = getCD003;
		Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url : '/eSOP/api/ajax/saveConfigData',
		    method : "POST",
		    params :{
				data : Ext.encode(updateData)
			},
		    success : function (response) {
	    		Ext.Msg.alert('更新完成','更新完成');
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','儲存失敗');
		    }
		});
	},
	crossSettingGridAfterrender : function(component, eOpts){
		Ext.getCmp("crossSettingGrid").setHeight(vpHeight_c1);
		Ext.EventManager.onWindowResize(function(w, h) {
			try {
				Ext.getCmp("crossSettingGrid").setHeight(h);
			} catch (e) {
			}
		}, this, true);
	}
});