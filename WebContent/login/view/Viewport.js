/**
 * 
 */
Ext.define('login.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [],
	layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
	items : [ {
		width : 340,
		id : 'loginForm',
		xtype : 'form',
		layout : {
			align : 'middle',
			pack : 'center'
		},
		fieldDefaults : {
			labelAlign : "left",
			labelWidth : 50,
			anchor : "100%"
		},
		frame : true,
		items : [ {
			xtype : "textfield",
			name : "userid",
			fieldLabel : "帳號 ",
			allowBlank : false
		}, {
			xtype : "textfield",
			name : "password",
			inputType : "password",
			fieldLabel : "密碼 "
		} ],
		buttons : [ {
			text : "登入",
			id : "login",
			formBind : true
		} ]
	} ]
});