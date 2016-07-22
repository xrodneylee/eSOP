/**
 * 
 */
Ext.define('BroadcastingPage.controller.BroadcastingPageControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#choicePanel' : {
				afterrender : this.choicePanelAfterrender
			}
		});
	},
	choicePanelAfterrender : function(component, eOpts){
		var queryData = new Object();
		queryData.SS001 = SS001;
		Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url : '/eSOP/api/ajax/getChoiceList',
		    method : "POST",
		    params :{
				data : Ext.encode(queryData)
			},
		    success : function (response) {
		    	response = Ext.decode(response.responseText);
		    	if(response.result == 'success'){
		    		for(var i = 0; i < response.record.length; i++){
		    			Ext.getCmp('choicePanel').add(new stationObj({
		    				ss003 : response.record[i].SS003,
		    				ss005 : response.record[i].SS005,
		    				ss007 : response.record[i].SS007
		    			}).create());
		    		}
		    	}
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','查詢失敗');
		    }
		});
	}
});
function onload(){
	alert()
}