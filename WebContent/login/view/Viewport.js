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
			labelWidth : 50
		},
		frame : true,
		items : [ {
			xtype : 'fieldset',
			layout : 'column',
			border : false,
			margin : '5 0 0 0',
			style: 'padding-left: 0px;',
			items : [{
				xtype : "textfield",
				name : "userid",
				fieldLabel : "帳號 ",
				allowBlank : false,
				width : 240
			},{
				xtype : 'button',
				id : 'OnlineUser',
				text : '線上使用者'
			}]
		}, {
			xtype : "textfield",
			name : "password",
			inputType : "password",
			fieldLabel : "密碼 ",
			margin : '5 0 0 0',
			width : 240
		} ],
		buttons : [ {
			text : "登入",
			id : "login",
			formBind : true
		} ]
	} ]
});