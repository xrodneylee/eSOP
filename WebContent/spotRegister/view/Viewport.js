/**
 * 
 */
Ext.define('spotRegister.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [],
	layout : {
		type : 'vbox',
		align : 'center',
		pack : 'center'
	},
	items : [ {
		width : 450,
		id : 'registerForm',
		xtype : 'form',
		title : 'eSOP註冊',
		layout : {
			align : 'middle',
			pack : 'center'
		},
		fieldDefaults : {
			labelAlign : "left",
			labelWidth : 75,
			anchor : "95%"
		},
		frame : true,
		items : [ {
			xtype : 'textfield',
			fieldStyle : 'color:#FF0000;',
			labelStyle : 'color:#FF0000;',
			name : 'status',
			id : 'status',
			fieldLabel : '本機狀態 ',
			readOnly : true,
			margin : '10 0 0 0'
		}, {
			xtype : 'fieldset',
			layout : 'column',
			border : false,
			margin : '5 0 0 0',
			style: 'padding-left: 0px;',
			items : [ {
				xtype : 'textfield',
				name : 'station',
				id : 'station',
				fieldLabel : '工位編號 ',
				allowBlank : false,
				border : false,
				width : 380
			},{
				xtype : 'button',
				id : 'check',
				text : '檢查'
			} ]

		}, {
			xtype : 'textfield',
			name : 'stationExplanation',
			id : 'stationExplanation',
			fieldLabel : '工位說明 ',
			margin : '5 0 0 0'
		}, {
			xtype : 'textfield',
			name : 'mac',
			id : 'mac',
			fieldLabel : 'MAC位址 ',
//			disabled : true,
			readOnly : true,
			margin : '5 0 0 0'
		}, {
			xtype : 'textfield',
			name : 'area',
			id : 'area',
			fieldLabel : '區域 ',
			margin : '5 0 0 0'
		}, {
			xtype : 'textfield',
			name : 'factory',
			id : 'factory',
			fieldLabel : '廠區 ',
			margin : '5 0 0 0'
		} ],
		buttons : [ {
			text : '註冊',
			id : 'register',
			formBind : true
		} ]
	} ]
});