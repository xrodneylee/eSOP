/**
 * 
 */
Ext.define('spotRegister.controller.spotRegisterControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#registerForm' : {
				afterrender : this.onRegisterFormAfterrender
			},
			'#check' : {
				click : this.onCheck
			},
			'#register' : {
				click : this.onRegister
			}
		});
	},
	onCheck : function(){
		var values = Ext.getCmp("registerForm").getValues();
		var registerInfo = new Object();
		registerInfo.ST001 = values["station"];
		Ext.Ajax.request({
		    url : '/eSOP/api/ajax/stationCheck',
		    method : "POST",
		    params :{
				data : Ext.encode(registerInfo)
			},
		    success : function (response) {
		    	response = Ext.decode(response.responseText);
		    	if(response.result == "success"){
		    		Ext.Msg.alert('','此工位編號已被註冊，請使用其他編號！');
		    	}else{
		    		Ext.Msg.alert('','此工位編號可以使用');
		    	}
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','驗證失敗');
		    }
		});
	},
	onRegisterFormAfterrender : function(component, eOpts){
		Ext.getCmp('status').setValue("未註冊");
		var registerInfo = new Object();
		registerInfo.ST003 = MAC;
		Ext.Ajax.request({
		    url : '/eSOP/api/ajax/isValid',
		    method : "POST",
		    params :{
				data : Ext.encode(registerInfo)
			},
		    success : function (response) {
		    	response = Ext.decode(response.responseText);
		    	if(response.result == "invalid"){
		    		Ext.getCmp('register').setVisible(false);
		    		Ext.getCmp('status').setValue("失效中");
		    	}
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','驗證失敗');
		    }
		});
		Ext.Ajax.request({
		    url : '/eSOP/api/ajax/getStationInit',
		    method : "POST",
		    params :{
				data : Ext.encode(registerInfo)
			},
		    success : function (response) {
		    	response = Ext.decode(response.responseText);
		    	if(response.result == "success"){
		    		Ext.getCmp('station').setValue(response.record[0].ST001);
		    		Ext.getCmp('stationExplanation').setValue(response.record[0].ST002);
		    		Ext.getCmp('mac').setValue(response.record[0].ST003);
		    		Ext.getCmp('area').setValue(response.record[0].ST004);
		    		Ext.getCmp('factory').setValue(response.record[0].ST005);
		    	}else{
		    		Ext.getCmp('mac').setValue(MAC);
		    	}
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','驗證失敗');
		    }
		});
	},
	onRegister : function(){
		var values = Ext.getCmp("registerForm").getValues();
		var registerInfo = new Object();
		registerInfo.ST001 = values["station"];
		registerInfo.ST002 = values["stationExplanation"];
		registerInfo.ST003 = MAC;
		registerInfo.ST004 = values["area"];
		registerInfo.ST005 = values["factory"];
		Ext.Ajax.request({
		    url : '/eSOP/api/ajax/register',
		    method : "POST",
		    params :{
				data : Ext.encode(registerInfo)
			},
		    success : function (response) {
		    	response = Ext.decode(response.responseText);
		    	if(response.result == "success"){
		    		//導向推播頁面
		    		window.location.replace("/eSOP/BroadcastingPage/BroadcastingPage.jsp?SS001="+values["station"]);
		    	}else{
		    		Ext.Msg.alert('','註冊失敗，請檢查工位編號是否已使用！');
		    	}
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','註冊失敗！！！');
		    }
		});
	}
});