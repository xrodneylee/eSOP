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
		    				ss007 : response.record[i].SS007,
		    				ss008 : response.record[i].SS008
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
function onload(ss005,ss008){
	Ext.getCmp('message').setValue(ss008);
	Ext.getCmp('pdfPanel').removeAll();
	Ext.getCmp('pdfPanel').add({
    	html:"<iframe scrolling=no frameborder=0 src='/eSOP/StationKanban/PDFLoader.jsp?fileName="+ss005+"' width=100% height=100%/>"
    });
}