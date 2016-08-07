/**
 * 
 */
Ext.define('OnlineUser.controller.OnlineUserControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#remove' : {
				click : this.onRemove
			},
			'#browseGridPanel' : {
				afterrender : this.onBrowseGridPanelAfterrender
			}
		})
	},
	onBrowseGridPanelAfterrender : function(component, eOpts){
		Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url : '/eSOP/api/ajax/getMaxUser',
		    method : "GET",
		    success : function (response) {
		    	Ext.getCmp('authorized').setValue(response.responseText);
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','載入失敗');
		    }
		});
		Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url : '/eSOP/api/ajax/getUserCount',
		    method : "GET",
		    success : function (response) {
		    	Ext.getCmp('users').setValue(response.responseText);
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','載入失敗');
		    }
		});
	},
	onRemove : function(){
    	var selections = Ext.getCmp('browseGridPanel').getSelectionModel().getSelection();
    	if(selections.length > 0){
        	var record = new Object();
        	var deleteInfo = new Array();
        	for(var i = 0; i < selections.length; i++){
    			var record = new Object();
    			record.OU001 = selections[i].get('OU001');
    			record.OU002 = selections[i].get('OU002');
    			deleteInfo[i]=record;
        	}
        	Ext.Ajax.request({
    			waitMsg: 'Please wait...',
    			url : '/eSOP/api/ajax/delete_ONLINE_USER_RECORD',
    		    method : "POST",
    		    params :{
    				data : Ext.encode(deleteInfo)
    			},
    		    success : function (response) {
    		    	Ext.getCmp('browseGridPanel').getStore().load();
    		    	Ext.Ajax.request({
    					waitMsg: 'Please wait...',
    					url : '/eSOP/api/ajax/getUserCount',
    				    method : "GET",
    				    success : function (response) {
    				    	Ext.getCmp('users').setValue(response.responseText);
    				    },
    				    failure : function (response) {
    				    	Ext.Msg.alert('','載入失敗');
    				    }
    				});
    		    },
    		    failure : function (response) {
    		    	Ext.Msg.alert('','踢除失敗');
    		    }
    		});
    	}
	}
});