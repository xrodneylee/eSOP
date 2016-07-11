/**
 * 
 */
var vpHeight_c1 =Ext.getBody().getViewSize().height;
Ext.define('SysConfig.controller.SysConfigControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#SysConfigGrid' : {
				afterrender : this.SysConfigGridAfterrender
			},
			'#SysConfigSave' : {
				click : this.onSysConfigSave
			}
		});
	},
	SysConfigGridAfterrender : function(component, eOpts){
		Ext.getCmp("SysConfigGrid").setHeight(vpHeight_c1);
		Ext.EventManager.onWindowResize(function(w, h) {
			try {
				Ext.getCmp("SysConfigGrid").setHeight(h);
			} catch (e) {
			}
		}, this, true);
	},
	onSysConfigSave : function(){
		var records = Ext.getCmp('SysConfigGrid').getStore().getRange();
		var updateData = new Object();
		var getCD001=new Array();
		var getCD003=new Array();
		for(var i=0;i<records.length;i++){
			getCD001[i]=records[i].get("CD001");
			getCD003[i]=records[i].get("CD003");
			if(records[i].get("CD001") == 'maxInactiveInterval')
				getCD003[i]=records[i].get("CD003")*60;
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
	}
});