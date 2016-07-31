/**
 * 
 */
Ext.define('login.controller.loginControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#login' : {
				click : this.login
			}
		});
	},
	login : function(){
		var values = Ext.getCmp("loginForm").getValues();
		var loginInfo = new Object();
		loginInfo.AUTH_ID = values["userid"];
		loginInfo.AUTH_PASSWORD = values["password"];
		loginInfo.sessionId = sessionId;
		loginInfo.ip = ip;
		Ext.Ajax.request({
		    url : '/eSOP/api/ajax/userCheck',
		    method : "POST",
		    params :{
				data : Ext.encode(loginInfo)
			},
		    success : function (response) {
		    	response = Ext.decode(response.responseText);
		    	if(response.result == "success"){
		    		window.location.replace(response.url);
		    	}else{
		    		Ext.Msg.alert('',response.msg);
		    	}
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','驗證失敗');
		    }
		});
	}
});