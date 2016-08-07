/**
 * 
 */
Ext.define('Authorization.controller.AuthorizationControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#Step2Panel' : {
				afterrender : this.Step2PanelAfterrender
			},
			'#serialsave' : {
				click : this.serialsave
			},
			'#undo' : {
				click : this.undo
			},
			'#regsave' : {
				click : this.regsave
			}
		})
	},
	Step2PanelAfterrender : function(component, eOpts){
		Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url: "/eSOP/api/ajax/getHardwareCode",
			method:"GET",
			failure : function(xhr) {
				Ext.MessageBox.alert('Ajax error', 'Ajax request ERROR' + xhr);
			},
			success : function(response){
				if(response.responseText!="")
					Ext.getCmp("regId").setValue(response.responseText);
				else
					alert('GuardService連接失敗，請進行環境設定');
			}
		});
	},
	undo : function(){
		window.location.replace("/eSOP/InitSet.jsp");
	},
	serialsave : function(){
		if(Ext.getCmp("serial").getValue()==""){
			alert('請輸入產品序號!');
			return;
		}

		Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url: "/eSOP/api/ajax/verifySerial/"+Ext.getCmp("serial").getValue(),
			method:"GET",
			failure : function(xhr) {
				Ext.MessageBox.alert('Ajax error', 'Ajax request ERROR' + xhr);
			},
			success : function(response){
				serialComboStore.load();
				tsStore.load();
				ModuleStore.load();
				alert(response.responseText);
			}
		});
	},
	regsave : function(){
		if(Ext.getCmp("serialCombo").getValue()==""){
			alert('請輸入產品序號!');//lang._t('JS_0123_00049')JS_0123_00049	請輸入產品序號!
			return;
		}
		if(Ext.getCmp("execId").getValue()==""){
			alert('請輸入執行碼');//lang._t('SFTU02_00015')SFTU02_00015=請輸入執行碼
			return;
		}

		var indexObj = new Object();
		indexObj.serial=Ext.getCmp("serialCombo").getValue();
		indexObj.hardware=Ext.getCmp("regId").getValue();
		indexObj.verifyCode=Ext.getCmp("execId").getValue();

		var jsonIndexAryStr= Ext.encode(indexObj);

		Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url: "/SFTU02/RS/updateControll/verifyExecuteCode",
			method:"POST",
			params:{
				   paramData : jsonIndexAryStr
			},
			error : function(xhr) {
				Ext.MessageBox.alert('Ajax error', 'Ajax request ERROR' + xhr);
			},
			success : function(response){
				Ext.getCmp("serialCombo").setValue("");
				Ext.getCmp("execId").setValue("");
				Ext.getCmp("serialCombo").getStore().load();
				Ext.getCmp("serialGridPanel").getStore().load();
				Ext.getCmp("moduleGridPanel").getStore().load();
				alert(response.responseText);
			}
		});
	}
});