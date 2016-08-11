/**
 * 
 */
Ext.define('initSet.controller.initSetControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#envSetting' : {
				click : this.onSetting
			},
			'#sysAuthorize' : {
				click : this.onAuthorize
			},
			'#initSetForm' : {
				afterrender : this.onInitSetFormAfterrender
			}
		});

	},
	onSetting : function() {
		if(currentIP != '127.0.0.1'){
			alert('只允許本地主機ip : 127.0.0.1 登入操作');
		}else{
			window.location.replace("/eSOP/ConfigEdit/ConfigEdit.jsp");
		}
	},
	onAuthorize : function() {
		if(currentIP != '127.0.0.1'){
			alert('只允許本地主機ip : 127.0.0.1 登入操作');
		}else{
			window.location.replace("/eSOP/Authorization/Authorization.jsp");
		}
	},
	onInitSetFormAfterrender : function(component, eOpts) {
		Ext.Ajax.request({
			waitMsg : 'Please wait...',
			url : '/eSOP/api/ajax/getMachineNumber/',
			method : "GET",
			success : function(response) {
				Ext.getCmp("machineCode").setValue(response.responseText);
			}
		});
		Ext.getCmp("currentIP").setValue(currentIP);
		Ext.getCmp("isVM").setValue(vmmessage);
	}
});