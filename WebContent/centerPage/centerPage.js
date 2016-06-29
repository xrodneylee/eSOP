/**
 * 登入後頁面
 */
Ext.onReady(function() {
	
	var toolBar = Ext.create("Ext.toolbar.Toolbar", {
		    autoWidth : true,
		    items: [
		        {
		            xtype: 'splitbutton',
		            text : '分類一',
		            menu:{
						items:[
							{text:'分類一-1',id:'one'},
							{text:'分類一-2',id:'two'}
						]
					}
		        },
		        {
		            xtype: 'splitbutton',
		            text : '分類二',
		            menu:{
						items:[
							{text:'分類二-1',id:'three'},
							{text:'分類二-2',id:'four'}
						]
					}
		        },
		        '->',
		        {
		        	id : 'logOut',
		            text : '登出',
		            iconCls : 'ExitDoor2'
		        },
		    ]
	});
	
	var viewport = Ext.create('Ext.container.Viewport',{
		hideBorders : true,
		layout : 'border',
		renderTo : document.body,
		items : [{
	        region: 'north',
	        items : [toolBar]
	    },{
			region:'center',
			xtype:'tabpanel',
			id:'mainTabPanel',
			activeTab:0,
			width:'100%',
			items:[
//				{
//					title:'歡迎',
//					closable: true,
//					id:'startPage',
//					html:"<iframe scrolling=no frameborder=0 src='StartPage.jsp' width=100% height=100% 	/>"
//				}
			]
		}]
	});
});