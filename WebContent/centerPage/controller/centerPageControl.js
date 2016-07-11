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
			},
			'#centerPage' : {
				afterrender : this.onCenterPageAfterrender
			},
			'#mainTabPanel' : {
				tabchange : this.onMainTabPanelTabchange
			}
		});
	},
	onLogout : function(){
		doLogout();
	},
	onSysConfig : function(){
		openOperation('SysConfig');
	},
	onCenterPageAfterrender : function(){
		ActivityMonitor.init({verbose : false, maxInactive: maxInactiveInterval * 1000});
		ActivityMonitor.start();
	},
	onMainTabPanelTabchange : function(tabPanel, newCard, oldCard, eOpts){
		ActivityMonitor.lastActive = new Date();
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
	}else if(OPID=='SysConfig'){
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

function doLogout(){
	window.location.replace('/eSOP');
}

function doSessionReload(){
	console.log('doSessionReload');
//	parent.ActivityMonitor.lastActive = new Date();
	
}