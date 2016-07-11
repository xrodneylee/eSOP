/**
 * 
 */
Ext.define('centerPage.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [],
    id : 'centerPage',
    layout: 'border',
    items:[
		{
			region:'north',
			xtype:'toolbar',
			items:[
				{
					xtype : 'button',
					id : 'stationKanban',
					text : '工位狀態總覽'
				},'-',{
					xtype : 'button',
					id : 'FileExplorer',
					text : '檔案管理'
				},'-',{
					xtype : 'button',
					id : 'stationManager',
					text : '工位管理'
				},'-',{
					xtype : 'button',
					id : 'loginCreater',
					text : '登入者代號建立'
				},'-',{
					xtype : 'button',
					id : 'sysConfig',
					text : '系統設定'
				},'->',{
					xtype:'button',
					text:'登出',
					id:'logOut',
					border:1,
					iconCls : 'ExitDoor2'
				}
			]
		},{
			region:'center',
			xtype:'tabpanel',
			id:'mainTabPanel',
			activeTab:0,
			width:'100%'
		}
	]
});
