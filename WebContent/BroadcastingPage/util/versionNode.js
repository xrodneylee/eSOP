/**
 * 
 */
function versionObj(parameter){
		this.sp001 = parameter.sp001;
		this.sp002 = parameter.sp002;

		this.create = function(){
			return Ext.create('Ext.Button',{
				text : this.sp002,
				width : 150,
				margin : '5 0 0 10',
				config:{
					sp001:this.sp001,
					sp002:this.sp002
			    },
				listeners : {
					click : function(component, e, eOpts){
						if(mode == 'standard'){
							var queryInfo = new Object();
							queryInfo.SS001 = SS001;
							queryInfo.SS003 = component.getInitialConfig('sp001');
							queryInfo.SS004 = component.getInitialConfig('sp002');
							Ext.Ajax.request({
								waitMsg: 'Please wait...',
								url : '/eSOP/api/ajax/getSingleVersion_standard',
							    method : "POST",
							    params :{
									data : Ext.encode(queryInfo)
								},
							    success : function (response) {
							    	response = Ext.decode(response.responseText);
							    	var firstPage = 1;
							    	if(response.record[0].SS007 != ''){
							    		var pages = splitPage(response.record[0].SS007);
							    		firstPage = pages[0];
							    	}
							    	Ext.getCmp('pdfPanel').removeAll();
									Ext.getCmp('pdfPanel').add({
								    	html:"<iframe scrolling=no frameborder=0 src='/eSOP/StationKanban/PDFLoader.jsp?fileName="+response.record[0].SS005+"#page="+firstPage+"' width=100% height=100%/>"
								    });
									Ext.getCmp('message').setValue(response.record[0].SS008);
									
									var updateInfo = new Object();
									updateInfo.ST001 = SS001;
									updateInfo.ST009 = component.getInitialConfig('sp001');
									updateInfo.ST010 = component.getInitialConfig('sp002');
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
									
									Ext.getCmp('pdfPanel').setTitle('<font color="red">SOP編號：'+component.getInitialConfig('sp001')+'&nbsp&nbsp&nbsp&nbsp版號：'+component.getInitialConfig('sp002')+'</font>');
							    },
							    failure : function (response) {
							    	Ext.Msg.alert('','更新失敗');
							    }
							});
						}else if(mode == 'history'){
							var queryInfo = new Object();
							queryInfo.SH001 = SS001;
							queryInfo.SH003 = component.getInitialConfig('sp001');
							queryInfo.SH004 = component.getInitialConfig('sp002');
							Ext.Ajax.request({
								waitMsg: 'Please wait...',
								url : '/eSOP/api/ajax/getSingleVersion_history',
							    method : "POST",
							    params :{
									data : Ext.encode(queryInfo)
								},
							    success : function (response) {
							    	response = Ext.decode(response.responseText);
							    	var firstPage = 1;
							    	if(response.record[0].SH007 != ''){
							    		var pages = splitPage(response.record[0].SH007);
							    		firstPage = pages[0];
							    	}
							    	Ext.getCmp('pdfPanel').removeAll();
									Ext.getCmp('pdfPanel').add({
								    	html:"<iframe scrolling=no frameborder=0 src='/eSOP/StationKanban/PDFLoader.jsp?fileName="+response.record[0].SH005+"#page="+firstPage+"' width=100% height=100%/>"
								    });
									Ext.getCmp('message').setValue(response.record[0].SH008);
									
									var updateInfo = new Object();
									updateInfo.ST001 = SS001;
									updateInfo.ST009 = component.getInitialConfig('sp001');
									updateInfo.ST010 = component.getInitialConfig('sp002');
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
									
									Ext.getCmp('pdfPanel').setTitle('<font color="red">SOP編號：'+component.getInitialConfig('sp001')+'&nbsp&nbsp&nbsp&nbsp版號：'+component.getInitialConfig('sp002')+'</font>');
							    },
							    failure : function (response) {
							    	Ext.Msg.alert('','更新失敗');
							    }
							});
						}
						
					}
				}
			});
		}
}
