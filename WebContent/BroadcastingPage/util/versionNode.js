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
				handler : function(){
					var queryInfo = new Object();
					queryInfo.SS001 = SS001;
					queryInfo.SS003 = this.sp001;
					queryInfo.SS004 = this.sp002;
					Ext.Ajax.request({
						waitMsg: 'Please wait...',
						url : '/eSOP/api/ajax/getSingleVersion',
					    method : "POST",
					    params :{
							data : Ext.encode(queryInfo)
						},
					    success : function (response) {
					    	response = Ext.decode(response.responseText);
					    	
					    	var firstPage = 1;
					    	if(response.record[0].SS007 != ''){
					    		var pages = splitPage(response.record[0].SS005);
					    		firstPage = pages[0];
					    	}
					    	Ext.getCmp('pdfPanel').removeAll();
							Ext.getCmp('pdfPanel').add({
						    	html:"<iframe scrolling=no frameborder=0 src='/eSOP/StationKanban/PDFLoader.jsp?fileName="+response.record[0].SS005+"#page="+firstPage+"' width=100% height=100%/>"
						    });
							Ext.getCmp('message').setValue(response.record[0].SS008);
							
							var updateInfo = new Object();
							updateInfo.ST001 = SS001;
							updateInfo.ST009 = this.sp001;
							updateInfo.ST010 = this.sp002;
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
					    },
					    failure : function (response) {
					    	Ext.Msg.alert('','更新失敗');
					    }
					});
				}
			});
		}
}
