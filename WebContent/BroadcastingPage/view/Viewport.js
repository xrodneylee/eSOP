/**
 * 
 */
Ext.define('BroadcastingPage.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [],
	id : 'BroadcastingPage',
	layout : 'border',
	items : [ {
		region : 'east',
		xtype : 'panel',
		title : 'SOP編號',
		layout : 'border',
		frame : true,
		width : '15%',
		collapsible : true,
		items : [{
			xtype : 'panel',
			region : 'center',
			id : 'choicePanel',
			frame : true,
			width : '100%',
			height : '85%',
			layout : 'column',
			autoScroll : true,
			tbar : [ {
				xtype : 'button',
				text : '標準',
				id : 'standard',
				width : '50%'
			}, {
				xtype : 'button',
				text : '歷史',
				id : 'history',
				width : '50%',
				iconCls : 'icon-list'
			} ]
		},{
			xtype : 'panel',
			title : '版號',
			region: 'south',
			id : 'verPanel',
			frame : true,
			width : '100%',
			height : '15%',
			layout : 'column',
			bodyStyle : 'overflow-x:hidden; overflow-y:auto' 
		}]
	}, {
		region : 'center',
		xtype : 'panel',
		width : '85%',
		layout : 'border',
		items : [ {
			xtype : 'panel',
			region: 'center',
			title : '瀏覽區',
			id : 'pdfPanel',
			frame : true,
			layout : 'fit',
			width : '100%',
			height : '85%'
		}, {
			xtype : 'panel',
			region: 'south',
			id : 'ss008Panel',
			title : '說明',
			frame : true,
			collapsible : true,
			width : '100%',
			height : '15%',
			items : [ {
				xtype : 'textareafield',
				grow : true,
				readOnly : true,
				id : 'message',
				width : '100%',
				anchor : '100%'
			} ]
		} ]
	} ]
});
