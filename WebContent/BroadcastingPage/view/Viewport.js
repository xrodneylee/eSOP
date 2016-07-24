/**
 * 
 */
Ext.define('BroadcastingPage.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [],
    id : 'BroadcastingPage',
    layout: 'border',
    items:[
		{
			region : 'east',
			xtype : 'panel',
			id:'choicePanel',
			frame : true,
			width:'15%',
			height:'85%',
			collapsible: true,
			layout : 'column',
			autoScroll : true,
			tbar : [{
				xtype : 'button',
				text : '標準',
				id : 'standard',
				width : '50%'
			},{
				xtype : 'button',
				text : '歷史',
				id : 'history',
				width : '50%',
				iconCls : 'icon-list'
			}],
			items:[]
		},{
			region:'center',
			xtype:'panel',
			id:'pdfPanel',
			layout : 'fit',
			frame : true,
			width:'85%',
			height:'85%'
		},{
			region:'south',
			xtype:'panel',
			id:'ss008Panel',
			title : '說明',
			frame : true,
			collapsible: true,
			width:'100%',
			height:'15%',
			items : [{
		        xtype : 'textareafield',
		        grow : true,
		        id : 'message',
		        width : '100%',
		        anchor : '100%'
		    }]
		}
	]
});
