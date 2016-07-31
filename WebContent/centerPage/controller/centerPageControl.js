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
			},
			'#stationKanban' : {
				click : this.onStationKanban
			},
			'#loginCreater' : {
				click : this.onLoginCreater
			},
			'#stationManager' : {
				click : this.onStationManager
			},
			'#fileExplorer' : {
				click : this.onFileExplorer
			}
		});
	},
	onLogout : function(){
		doLogout();
	},
	onSysConfig : function(){
		openOperation('SysConfig');
	},
	onStationKanban : function(){
		openOperation('StationKanban');
	},
	onLoginCreater : function(){
		openOperation('LoginCreater');
	},
	onStationManager : function(){
		openOperation('StationManager');
	},
	onFileExplorer : function(){
		openOperation('FileExplorer');
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
	if(OPID=='StationKanban'){
		title='工位狀態總覽';
		src='/eSOP/StationKanban/StationKanban.jsp';
	}else if(OPID=='FileExplorer'){
		title='檔案管理';
		src='/eSOP/FileExplorer/FileExplorer.jsp';
	}else if(OPID=='StationManager'){
		title='工位管理';
		src='/eSOP/StationManager/StationManager.jsp';
	}else if(OPID=='LoginCreater'){
		title='登入者代號建立';
		src='/eSOP/LoginCreater/LoginCreater.jsp';
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
	var logoutInfo = new Object();
	logoutInfo.userID = userID;
	logoutInfo.ip = ip;
	logoutInfo.sessionId = sessionId;
	Ext.Ajax.request({
	    url : '/eSOP/api/ajax/logout',
	    method : "POST",
	    params :{
			data : Ext.encode(logoutInfo)
		},
	    success : function (response) {
	    	window.location.replace('/eSOP');
	    },
	    failure : function (response) {
	    	Ext.Msg.alert('','驗證失敗');
	    }
	});
	
}

function doSessionReload(){
	console.log('doSessionReload');
//	parent.ActivityMonitor.lastActive = new Date();
	
}