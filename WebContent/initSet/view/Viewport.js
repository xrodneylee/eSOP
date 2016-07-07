/**
 * 
 */
Ext.define('initSet.view.Viewport',{
		extend : 'Ext.container.Viewport',
		requires : [],
		layout : 'fit',
		initComponent : function() {
			Ext.apply(this, {
				items : [ {
					xtype : 'panel',
					id : 'initSetForm',
					title : '系統初始化設定',
					frame : true,
					items : [ {
						xtype : 'label',
						text : '系統註冊及eSOP系統設定只能從127.0.0.1 登入設定'
					}, {
						xtype : 'fieldset',
						layout : 'column',
						border : false,
						margin : '15 0 0 0',
						items : [ {
							xtype : 'label',
							text : '請選擇語系',
							margin : '2 0 0 150'
						}, this.buildLanguageCombo() ]
					}, {
						xtype : 'fieldset',
						layout : 'hbox',
						border : false,
						margin : '5 0 0 0',
						items : [ {
							xtype : 'label',
							text : '目前登入ip',
							margin : '2 0 0 150'
						}, {
							xtype : 'textfield',
							id : 'currentIP',
							margin : '0 0 0 8',
							width : 250,
							readOnly : true
						} ]
					}, {
						xtype : 'fieldset',
						layout : 'hbox',
						border : false,
						margin : '5 0 0 0',
						items : [ {
							xtype : 'label',
							text : 'eSOP主機是否安裝在VM環境下',
							margin : '2 0 0 43'
						}, {
							xtype : 'textfield',
							id : 'isVM',
							margin : '0 0 0 8',
							width : 250,
							readOnly : true
						} ]
					}, {
						xtype : 'fieldset',
						layout : 'hbox',
						border : false,
						margin : '5 0 0 0',
						items : [ {
							xtype : 'label',
							text : '主機設備的機碼為',
							margin : '2 0 0 112'
						}, {
							xtype : 'textfield',
							id : 'machineCode',
							margin : '0 0 0 8',
							width : 250,
							readOnly : true
						} ]
					}, {
						xtype : 'fieldset',
						layout : 'hbox',
						border : false,
						margin : '10 0 0 5',
						items : [ {
							xtype : 'button',
							id : 'envSetting',
							text : '環境設定',
							width : 100
						}, {
							xtype : 'button',
							id : 'sysAuthorize',
							text : '系統授權',
							width : 100,
							margin : '0 0 0 20',
						} ]
					} ]
				} ]
			});
			this.callParent();
		},
		buildLanguageCombo : function() {
			return {
				xtype : 'combo',
				name : 'language',
				id : 'language',
				mode : 'local',
				width : 180,
				store : new Ext.data.ArrayStore({
					fields : [ 'id', 'name' ],
					data : [ [ '1', '繁體中文' ], [ '2', '简体中文' ], [ '3', 'English' ], [ '4', 'Việt' ] ]
				}),
				margin : '0 0 0 5',
				valueField : 'id',
				displayField : 'name',
				editable : false,
				triggerAction : 'all',
				value : '1'
			}
		}
});