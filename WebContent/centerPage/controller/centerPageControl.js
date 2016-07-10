/**
 * 
 */
Ext.define('centerPage.controller.centerPageControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#logOut' : {
				click : this.onLogout
			},
			'#sysConfig' : {
				click : this.onSysConfig
			}
		});
	},
	onLogout : function(){
		window.location.replace('/eSOP');
	},
	onSysConfig : function(){
		openOperation('SysConfig');
	}
});
function openOperation(OPID){
	var title='';
	var src='';
	if(OPID=='stationKanban'){
		title='工位狀態總覽';
		src='';
	}else if(OPID=='FileExplorer'){
		title='檔案管理';
		src='';
	}else if(OPID=='stationManager'){
		title='工位管理';
		src='';
	}else if(OPID=='loginCreater'){
		title='登入者代號建立';
		src='';
	}else if(OPID=='sysConfig'){
		title='系統設定';
		src='/eSOP/SysConfig/SysConfig.jsp';
	}
	
	src+='?userId='+userID;
	var pageNum=-1;
	pageNum=Ext.getCmp('mainTabPanel').getComponent(OPID);
	if(!pageNum){
		pageNum = Ext.getCmp('mainTabPanel').add({
				id:OPID,
				title:title,
		        closable:true,
		    	html:"<iframe scrolling=no frameborder=0 src='"+src+"' width=100% height=100% 	/>"
		    }							
		);
	}
	Ext.getCmp('mainTabPanel').setActiveTab(pageNum);
}