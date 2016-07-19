/**
 * 
 */
Ext.define('StationKanban.view.Viewport',{
	extend : 'Ext.container.Viewport',
	requires : [],
	layout : 'border',
	items : [{
		xtype : 'panel',
		id : 'stationKanbanPanel',
		region: 'center',
		layout: 'fit',
		frame : true,
		border : false,
		autoScroll : true,
		manageHeight : false,
		tbar : [ {
			xtype : 'triggerfield',
			id : 'factory',
			fieldLabel : '工廠',
			labelWidth : 50,
			labelAlign : 'right',
			editable : false,
			triggerCls : 'x-form-search-trigger'
		}, {
			xtype : 'triggerfield',
			id : 'area',
			fieldLabel : '區域',
			labelWidth : 50,
			labelAlign : 'right',
			editable : false,
			triggerCls : 'x-form-search-trigger'
		},"&nbsp", {
			xtype : 'button',
			text : '查詢',
			id : 'query',
			border : 1,
			iconCls : 'icon-query'
		}],
		items : [{
			xtype : 'panel',
			id : 'stationKanban',
			title : '工位狀態',
			frame : true,
			layout : 'column',
			margin : '5 0 0 0'
		}]
	}]
});