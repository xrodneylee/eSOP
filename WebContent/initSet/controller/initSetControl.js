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
		window.location.replace("/eSOP/ConfigEdit/ConfigEdit.jsp");
	},
	onAuthorize : function() {

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