/**
 *
 */
Ext.application({
    name: 'login',
    appFolder: 'login',
    autoCreateViewport: true,
	models : [],
	stores : [],
	views : ['Viewport'],
	controllers : ['loginControl']
});
//Ext.onReady(function() {
//
//	var loginForm = Ext.create("Ext.form.Panel", {
//		frame : true,
//		width : 340,
//		bodyPadding : 5,
////		bodyStyle:'background:#f5f5f5',
//		fieldDefaults : {
//			labelAlign : "left",
//			labelWidth : 50,
//			anchor : "100%"
//		},
//		items : [ {
//			xtype : "textfield",
//			name : "userid",
//			fieldLabel : "帳號 ",
//			allowBlank : false
//		}, {
//			xtype : "textfield",
//			name : "password",
//			inputType : "password",
//			fieldLabel : "密碼 ",
//		} ],
//		buttons : [ {
//			text : "登入",
//			formBind : true,
//			handler : function() {
//				var form = this.up("form").getForm();
//				var values = form.getValues();
//				var loginInfo = new Object();
//				loginInfo.AUTH_ID = values["userid"];
//				loginInfo.AUTH_PASSWORD = values["password"];
//				Ext.Ajax.request({
//				    url : '/eSOP/api/ajax/userCheck',
//				    method : "POST",
//				    params :{
//						data : Ext.encode(loginInfo)
//					},
//				    success : function (response) {
//				    	response = Ext.decode(response.responseText);
//				    	window.location.replace(response.url);
//				    },
//				    failure : function (response) {
//				    	Ext.Msg.alert('','驗證失敗');
//				    }
//				});
//			}
//		} ]
//	});
//
//	var loginPanel = Ext.create('Ext.panel.Panel', {
//		
//		layout : {                        
//	        type : 'hbox',
//	        align : 'middle',
//	        pack : 'center'
//	    },
////	    bodyStyle: 'background-image:url(/eSOP/sources/css/images/WIP_login_TC_big.jpg);background-position: center; background-repeat: no-repeat;',
//	    items : [loginForm]
//	});
//	
//	var viewport = Ext.create('Ext.container.Viewport',{
//		hideBorders : true,
//		layout : 'fit',
//		renderTo : document.body,
//		items : [loginPanel]
//	});
//});