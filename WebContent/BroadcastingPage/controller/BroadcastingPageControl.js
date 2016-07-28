/**
 * 
 */
var timeCount = 0;
var st011 = '';
var mode = 'standard';//判斷是【標準】還是【歷史】，預設【標準】
Ext.define('BroadcastingPage.controller.BroadcastingPageControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#choicePanel' : {
				afterrender : this.choicePanelAfterrender
			},
			'#standard' : {
				click : this.onStandard
			},
			'#history' : {
				click : this.onHistory
			}
		});
	},
	choicePanelAfterrender : function(component, eOpts){
		ActivityMonitor.init({verbose : false, maxInactive: checkFileInterval * 1000});
		ActivityMonitor.start();
		loadChoicePanel_standard();
	},
	onStandard : function(){
		mode = 'standard';
		loadChoicePanel_standard();
	},
	onHistory : function(){
		mode = 'history';
		loadChoicePanel_history();
	}
});
function loadChoicePanel_standard(){
	Ext.getCmp('choicePanel').removeAll();
	Ext.getCmp('verPanel').removeAll();
	var queryData = new Object();
	queryData.SS001 = SS001;
	queryData.ST001 = SS001;
	Ext.Ajax.request({
		waitMsg: 'Please wait...',
		url : '/eSOP/api/ajax/getChoiceList_standard',
	    method : "POST",
	    params :{
			data : Ext.encode(queryData)
		},
	    success : function (response) {
	    	var fileSet = new hashSet();
	    	response = Ext.decode(response.responseText);
	    	if(response.result == 'success'){
	    		for(var i = 0; i < response.record.length; i++){
	    			//SOP編號(SS003)重複不再顯示
	    			if(!fileSet.contains(response.record[i].SS003)){
	    				fileSet.add(response.record[i].SS003);
	    				
	    				Ext.getCmp('choicePanel').add(new fileObj({
		    				ss003 : response.record[i].SS003,
		    				ss004 : response.record[i].SS004,
		    				ss005 : response.record[i].SS005,
		    				ss006 : response.record[i].SS006,
		    				ss007 : response.record[i].SS007,
		    				ss008 : response.record[i].SS008
		    			}).create());
					}
	    		}
	    		onloadPDF(response.record[0].SS003,response.record[0].SS004,response.record[0].SS005,response.record[0].SS006,response.record[0].SS007,response.record[0].SS008);
	    	}
	    },
	    failure : function (response) {
	    	Ext.Msg.alert('','查詢失敗');
	    }
	});
	//抓取推播碼(ST011)當全域變數
	Ext.Ajax.request({
		waitMsg: 'Please wait...',
		url : '/eSOP/api/ajax/getST011',
	    method : "POST",
	    params :{
			data : Ext.encode(queryData)
		},
	    success : function (response) {
	    	response = Ext.decode(response.responseText);
	    	if(response.result == 'success'){
    			st011 = response.ST011;
	    	}
	    },
	    failure : function (response) {
	    	Ext.Msg.alert('','查詢失敗');
	    }
	});
}
function loadChoicePanel_history(){
	Ext.getCmp('choicePanel').removeAll();
	Ext.getCmp('verPanel').removeAll();
	var queryData = new Object();
	queryData.SH001 = SS001;
	Ext.Ajax.request({
		waitMsg: 'Please wait...',
		url : '/eSOP/api/ajax/getChoiceList_history',
	    method : "POST",
	    params :{
			data : Ext.encode(queryData)
		},
	    success : function (response) {
	    	var fileSet = new hashSet();
	    	response = Ext.decode(response.responseText);
	    	if(response.result == 'success'){
	    		for(var i = 0; i < response.record.length; i++){
	    			//SOP編號(SH003)重複不再顯示
	    			if(!fileSet.contains(response.record[i].SH003)){
	    				fileSet.add(response.record[i].SH003);
	    				
	    				Ext.getCmp('choicePanel').add(new fileObj({
		    				ss003 : response.record[i].SH003,
		    				ss004 : response.record[i].SH004,
		    				ss005 : response.record[i].SH005,
		    				ss006 : response.record[i].SH006,
		    				ss007 : response.record[i].SH007,
		    				ss008 : response.record[i].SH008
		    			}).create());
					}
	    		}
	    		onloadPDF(response.record[0].SH003,response.record[0].SH004,response.record[0].SH005,response.record[0].SH006,response.record[0].SH007,response.record[0].SH008);
	    	}
	    },
	    failure : function (response) {
	    	Ext.Msg.alert('','查詢失敗');
	    }
	});
}
function onloadPDF(ss003,ss004,ss005,ss006,ss007,ss008){
	var firstPage = 1;
	if(ss007 != ''){
		var pages = splitPage(ss007);
		firstPage = pages[0];
	}
	Ext.getCmp('pdfPanel').removeAll();
	Ext.getCmp('pdfPanel').add({
    	html:"<iframe scrolling=no frameborder=0 src='/eSOP/StationKanban/PDFLoader.jsp?fileName="+ss005+"#page="+firstPage+"' width=100% height=100%/>"
    });
	Ext.getCmp('message').setValue(ss008);
	
	var updateInfo = new Object();
	updateInfo.ST001 = SS001;
	updateInfo.ST009 = ss003;
	updateInfo.ST010 = ss004;
	Ext.Ajax.request({
		waitMsg: 'Please wait...',
		url : '/eSOP/api/ajax/update_ST009_ST010',
	    method : "POST",
	    params :{
			data : Ext.encode(updateInfo)
		},
	    success : function (response) {
	    	
	    },
	    failure : function (response) {
	    	Ext.Msg.alert('','更新失敗');
	    }
	});
	Ext.getCmp('pdfPanel').setTitle('<font color="red">SOP編號：'+ss003+'&nbsp&nbsp&nbsp&nbsp版號：'+ss004+'</font>');
	//動態產生版號
	createVersionBtn(ss003,ss005,ss006);
}

function createVersionBtn(ss003,ss005,ss006){
	if(ss006 == 'N' || ss006 == ''){
		Ext.getCmp('verPanel').removeAll();
		var queryData = new Object();
		queryData.SS003 = ss003;
		Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url : '/eSOP/api/ajax/getVersionList',
		    method : "POST",
		    params :{
				data : Ext.encode(queryData)
			},
		    success : function (response) {
		    	response = Ext.decode(response.responseText);
		    	if(response.result == 'success'){
		    		for(var i = 0; i < response.record.length; i++){
		    			Ext.getCmp('verPanel').add(new versionObj({
		    				sp001 : ss003,
		    				sp002 : response.record[i].SP002
		    			}).create());
		    		}
		    	}
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','查詢失敗');
		    }
		});
	}else{
		Ext.getCmp('verPanel').removeAll();
	}
}

function splitPage(pages){
	var pagesContainer1 = pages.split(",");
	var discretePage = "";
	for(var i=0;i<pagesContainer1.length;i++){
		if(pagesContainer1[i].indexOf("-") != -1){
			var pagesContainer2 = pagesContainer1[i].split("-");
			for(var j=pagesContainer2[0];j<=pagesContainer2[1];j++){
				if(discretePage == ""){
					discretePage += j;
				}else{
					discretePage += ","+j;
				}
			}
		}else{
			if(discretePage == ""){
				discretePage += pagesContainer1[i];
			}else{
				discretePage += ","+pagesContainer1[i];
			}
		}
	}
	return discretePage;
}

function doSessionReload(){
	//依參數設定只更新右視窗資料(SOP編號、版號)
	if(timeCount == checkFileInterval){
		timeCount = 0;
		if(mode == 'standard'){//標準
			var queryData = new Object();
			queryData.ST001 = SS001;
			queryData.ST011 = st011;
			Ext.Ajax.request({
				waitMsg: 'Please wait...',
				url : '/eSOP/api/ajax/doReload',
			    method : "POST",
			    params :{
					data : Ext.encode(queryData)
				},
			    success : function (response) {
			    	response = Ext.decode(response.responseText);
			    	if(response.result == 'reload'){
			    		st011 = response.ST011;
			    		Ext.getCmp('choicePanel').removeAll();
						Ext.getCmp('verPanel').removeAll();
						var queryData = new Object();
						queryData.SS001 = SS001;
						Ext.Ajax.request({
							waitMsg: 'Please wait...',
							url : '/eSOP/api/ajax/getChoiceList_standard',
						    method : "POST",
						    params :{
								data : Ext.encode(queryData)
							},
						    success : function (response) {
						    	var fileSet = new hashSet();
						    	response = Ext.decode(response.responseText);
						    	if(response.result == 'success'){
						    		for(var i = 0; i < response.record.length; i++){
						    			//SOP編號(SS003)重複不再顯示
						    			if(!fileSet.contains(response.record[i].SS003)){
						    				fileSet.add(response.record[i].SS003);
						    				
						    				Ext.getCmp('choicePanel').add(new fileObj({
							    				ss003 : response.record[i].SS003,
							    				ss004 : response.record[i].SS004,
							    				ss005 : response.record[i].SS005,
							    				ss006 : response.record[i].SS006,
							    				ss007 : response.record[i].SS007,
							    				ss008 : response.record[i].SS008
							    			}).create());
										}
						    		}
						    		onloadPDF(response.record[0].SS003,response.record[0].SS004,response.record[0].SS005,response.record[0].SS006,response.record[0].SS007,response.record[0].SS008);
//						    		createVersionBtn(response.record[0].SS003,response.record[0].SS005,response.record[0].SS006);
						    	}
						    },
						    failure : function (response) {
						    	Ext.Msg.alert('','查詢失敗');
						    }
						});
			    	}
			    },
			    failure : function (response) {
			    	Ext.Msg.alert('','查詢失敗');
			    }
			});
		}else if(mode == 'history'){//歷史
			Ext.getCmp('choicePanel').removeAll();
			Ext.getCmp('verPanel').removeAll();
			var queryData = new Object();
			queryData.SH001 = SS001;
			Ext.Ajax.request({
				waitMsg: 'Please wait...',
				url : '/eSOP/api/ajax/getChoiceList_history',
			    method : "POST",
			    params :{
					data : Ext.encode(queryData)
				},
			    success : function (response) {
			    	var fileSet = new hashSet();
			    	response = Ext.decode(response.responseText);
			    	if(response.result == 'success'){
			    		for(var i = 0; i < response.record.length; i++){
			    			//SOP編號(SH003)重複不再顯示
			    			if(!fileSet.contains(response.record[i].SH003)){
			    				fileSet.add(response.record[i].SH003);
			    				
			    				Ext.getCmp('choicePanel').add(new fileObj({
				    				ss003 : response.record[i].SH003,
				    				ss004 : response.record[i].SH004,
				    				ss005 : response.record[i].SH005,
				    				ss006 : response.record[i].SH006,
				    				ss007 : response.record[i].SH007,
				    				ss008 : response.record[i].SH008
				    			}).create());
							}
			    		}
			    		onloadPDF(response.record[0].SH003,response.record[0].SH004,response.record[0].SH005,response.record[0].SH006,response.record[0].SH007,response.record[0].SH008);
//			    		createVersionBtn(response.record[0].SH003,response.record[0].SH005,response.record[0].SH006);
			    	}
			    },
			    failure : function (response) {
			    	Ext.Msg.alert('','查詢失敗');
			    }
			});
		}
	}else{
		timeCount++;
	}
}