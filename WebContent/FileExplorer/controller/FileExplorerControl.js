/**
 * 
 */
var vpHeight_c1 =Ext.getBody().getViewSize().height;
var vpWidth_c1 =Ext.getBody().getViewSize().width;
Ext.define('FileExplorer.controller.FileExplorerControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#browseGridPanel' : {
				afterrender : this.onBrowseGridPanelAfterrender
			},
			'#clean' : {
				click : this.onClean
			},
			'#query' : {
				click : this.onQuery
			}
		});
	},
	onClean : function(){
		Ext.getCmp("SP003").setValue('');
		Ext.getCmp("SP001").setValue('');
		Ext.getCmp("AL002@1").setValue('');
		Ext.getCmp("AL002@2").setValue('');
		Ext.getCmp("SP004").setValue('');
		Ext.getCmp("AL002@3").setValue('');
		Ext.getCmp("start").setValue('');
		Ext.getCmp("end").setValue('');
	},
	onQuery : function(){
		var queryInfo = new Object();
		queryInfo.SP001 = Ext.getCmp('SP001').getValue();
		queryInfo.SP003 = Ext.getCmp('SP003').getValue();
		queryInfo.SP004 = Ext.getCmp('SP004').getValue();
		queryInfo.SP005 = Ext.getCmp('AL002@1').getValue();
		queryInfo.SP006 = Ext.getCmp('AL002@2').getValue();
		queryInfo.SP009 = Ext.getCmp('AL002@3').getValue();
		queryInfo.start = Ext.getCmp('start').getValue();
		queryInfo.end = Ext.getCmp('end').getValue();
		Ext.Ajax.request({
	    	waitMsg: 'Please wait...',
	    	url: "/eSOP/api/ajax/getSOP_query",
	    	method:"POST",
	    	params:{
	    		data : Ext.encode(queryInfo)
	    	},
	    	failure : function(xhr) {
	    		Ext.MessageBox.alert('Ajax error', 'Ajax request 發生錯誤' + xhr);
	    	},
	    	success : function(response){
				response=Ext.decode(response.responseText);
				if (response != null){
					Ext.getCmp('browseGridPanel').getStore().removeAll();
					Ext.getCmp('browseGridPanel').getStore().loadData(response.SOP_01);
				}
			}
		});
	},
	onBrowseGridPanelAfterrender : function(component, eOpts){
		Ext.getCmp("browseGridPanel").setHeight(vpHeight_c1/4*3+10);
		Ext.EventManager.onWindowResize(function(w, h) {
			try {
				Ext.getCmp("browseGridPanel").setHeight(h/4*3+10);
			} catch (e) {
			}
		}, this, true);
		
		// 工廠Trigger
    	Ext.getCmp("AL002@3").onTriggerClick=function(){
    		if(factoryWin==undefined){
    			factoryWin=factory_Win();
    		}
    		sql_fun_attribute('',3);
			factoryWin.show();
    	};
    	// 品號Trigger
    	Ext.getCmp("AL002@1").onTriggerClick=function(){
    		if(itemWin==undefined){
    			itemWin=item_Win();
    		}
    		sql_fun_attribute('',1);
    		itemWin.show();
    	};
    	// 作業Trigger
    	Ext.getCmp("AL002@2").onTriggerClick=function(){
    		if(operationWin==undefined){
    			operationWin=operation_Win();
    		}
    		sql_fun_attribute('',2);
    		operationWin.show();
    	};
    	// 實體檔名Trigger
    	Ext.getCmp("SP003").onTriggerClick=function(){
    		if(filenameWin==undefined){
    			filenameWin=filename_Win();
    		}
    		sql_fun_sop(Ext.getCmp('SP001').getValue(),'','SP003');
    		filenameWin.show();
    	};
    	// SOP編號Trigger
    	Ext.getCmp("SP001").onTriggerClick=function(){
    		if(sp001Win==undefined){
    			sp001Win=sp001_Win();
    		}
    		sql_fun_sop('',Ext.getCmp('SP003').getValue(),'SP001');
    		sp001Win.show();
    	};
	}
});

var factory_Win_grid, factoryWin;
function factory_Win(){
	var factoryTriggerField=getTriggerField('factoryTriggerField');
    var store = new Ext.data.Store({
    	proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'ATTRIBUTE_LIST_01'
            }
        },
        fields: [
           {name: 'AL002'},
           {name: 'AL003'}
        ]
    });
    factory_Win_grid = new Ext.grid.GridPanel({
    	id:'factory_Win_grid',
        store: store,
        region:'center',
        columns: [
                  {name:'AL002',header:'工廠', width:100, sortable: true, dataIndex: 'AL002'},//屬性值
                  {name:'AL003',header:'備註', width:100, sortable: true, dataIndex: 'AL003'}//備註
        ],
        stripeRows: true,
        width:335,
        height:300,
        tbar: ['工廠:', ' ',factoryTriggerField]
    });
    factoryTriggerField.onTriggerClick=function(){
    	sql_fun_attribute(factoryTriggerField.getValue(),3);
	}; 
	
	// 在開窗中選擇了資料
	factory_Win_grid.on("celldblclick",function () {
    	var al002=factory_Win_grid.getSelectionModel().selected.first().get("AL002");
    	Ext.getCmp("AL002@3").setValue(al002);
    	factoryformwin.hide();
     },this);
    var factoryformwin= new Ext.Window({
        width:380,
        height:350,
        closeAction:'hide',   
        plain: false,
        items: factory_Win_grid,
        layout:'border',
        title:'工廠'
    });
    return factoryformwin;
}
//品號_跳窗_建置
var item_Win_grid, itemWin;
function item_Win(){
	var itemTriggerField=getTriggerField('itemTriggerField');
    var store = new Ext.data.Store({
    	proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'ATTRIBUTE_LIST_01'
            }
        },
        fields: [
           {name: 'AL002'},
           {name: 'AL003'}
        ]
    });
    item_Win_grid = new Ext.grid.GridPanel({
    	id:'item_Win_grid',
        store: store,
        region:'center',
        columns: [
                  {name:'AL002',header:'品號', width:100, sortable: true, dataIndex: 'AL002'},//屬性值
                  {name:'AL003',header:'備註', width:100, sortable: true, dataIndex: 'AL003'}//備註
        ],
        stripeRows: true,
        width:335,
        height:300,
        tbar: ['品號:', ' ',itemTriggerField]
    });
    itemTriggerField.onTriggerClick=function(){
    	sql_fun_attribute(itemTriggerField.getValue(),1);
	}; 
	
	// 在開窗中選擇了資料
	item_Win_grid.on("celldblclick",function () {
    	var al002=item_Win_grid.getSelectionModel().selected.first().get("AL002");
    	Ext.getCmp("AL002@1").setValue(al002);
    	itemformwin.hide();
     },this);
    var itemformwin= new Ext.Window({
        width:380,
        height:350,
        closeAction:'hide',   
        plain: false,
        items: item_Win_grid,
        layout:'border',
        title:'品號'
    });
    return itemformwin;
}
//作業_跳窗_建置
var operation_Win_grid, operationWin;
function operation_Win(){
	var operationTriggerField=getTriggerField('operationTriggerField');
    var store = new Ext.data.Store({
    	proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'ATTRIBUTE_LIST_01'
            }
        },
        fields: [
           {name: 'AL002'},
           {name: 'AL003'}
        ]
    });
    operation_Win_grid = new Ext.grid.GridPanel({
    	id:'operation_Win_grid',
        store: store,
        region:'center',
        columns: [
                  {name:'AL002',header:'作業', width:100, sortable: true, dataIndex: 'AL002'},//屬性值
                  {name:'AL003',header:'備註', width:100, sortable: true, dataIndex: 'AL003'}//備註
        ],
        stripeRows: true,
        width:335,
        height:300,
        tbar: ['作業:', ' ',operationTriggerField]
    });
    operationTriggerField.onTriggerClick=function(){
    	sql_fun_attribute(operationTriggerField.getValue(),1);
	}; 
	
	// 在開窗中選擇了資料
	operation_Win_grid.on("celldblclick",function () {
    	var al002=operation_Win_grid.getSelectionModel().selected.first().get("AL002");
    	Ext.getCmp("AL002@2").setValue(al002);
    	operationformwin.hide();
     },this);
    var operationformwin= new Ext.Window({
        width:380,
        height:350,
        closeAction:'hide',   
        plain: false,
        items: operation_Win_grid,
        layout:'border',
        title:'作業'
    });
    return operationformwin;
}
//實體檔名_跳窗_建置
var filename_Win_grid, filenameWin;
function filename_Win(){
	var filenameTriggerField=getTriggerField('filenameTriggerField');
    var store = new Ext.data.Store({
    	proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'SOP_01'
            }
        },
        fields: [
           {name: 'SP001'},
           {name: 'SP002'},
           {name: 'SP003'},
           {name: 'SP004'},
           {name: 'SP005'},
           {name: 'SP006'},
           {name: 'SP009'}
        ]
    });
    filename_Win_grid = new Ext.grid.GridPanel({
    	id:'filename_Win_grid',
        store: store,
        region:'center',
        columns: [
                  {name:'SP001',header:'SOP編號', width:100, sortable: true, dataIndex: 'SP001'},//SOP編號
                  {name:'SP002',header:'版號', width:100, sortable: true, dataIndex: 'SP002'},//版號
                  {name:'SP003',header:'實體檔名', width:100, sortable: true, dataIndex: 'SP003'},//實體檔名
                  {name:'SP004',header:'說明', width:100, sortable: true, dataIndex: 'SP004'},//說明
                  {name:'SP005',header:'品號', width:100, sortable: true, dataIndex: 'SP005'},//品號
                  {name:'SP006',header:'作業', width:100, sortable: true, dataIndex: 'SP006'},//作業
                  {name:'SP009',header:'廠區', width:100, sortable: true, dataIndex: 'SP009'}//廠區
        ],
        stripeRows: true,
        width:335,
        height:300,
        tbar: ['實體檔名:', ' ',filenameTriggerField]
    });
    filenameTriggerField.onTriggerClick=function(){
    	sql_fun_sop(Ext.getCmp('SP001').getValue(),filenameTriggerField.getValue(),'SP003');
	}; 
	
	// 在開窗中選擇了資料
	filename_Win_grid.on("celldblclick",function () {
    	var sp003=filename_Win_grid.getSelectionModel().selected.first().get("SP003");
    	Ext.getCmp("SP003").setValue(sp003);
    	filenameformwin.hide();
     },this);
    var filenameformwin= new Ext.Window({
        width:380,
        height:350,
        closeAction:'hide',   
        plain: false,
        items: filename_Win_grid,
        layout:'border',
        title:'實體檔名'
    });
    return filenameformwin;
}
//SOP編號_跳窗_建置
var sp001_Win_grid, sp001Win;
function sp001_Win(){
	var sp001TriggerField=getTriggerField('sp001TriggerField');
    var store = new Ext.data.Store({
    	proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'SOP_01'
            }
        },
        fields: [
           {name: 'SP001'},
           {name: 'SP002'},
           {name: 'SP003'},
           {name: 'SP004'},
           {name: 'SP005'},
           {name: 'SP006'},
           {name: 'SP009'}
        ]
    });
    sp001_Win_grid = new Ext.grid.GridPanel({
    	id:'sp001_Win_grid',
        store: store,
        region:'center',
        columns: [
                  {name:'SP001',header:'SOP編號', width:100, sortable: true, dataIndex: 'SP001'},//SOP編號
                  {name:'SP002',header:'版號', width:100, sortable: true, dataIndex: 'SP002'},//版號
                  {name:'SP003',header:'實體檔名', width:100, sortable: true, dataIndex: 'SP003'},//實體檔名
                  {name:'SP004',header:'說明', width:100, sortable: true, dataIndex: 'SP004'},//說明
                  {name:'SP005',header:'品號', width:100, sortable: true, dataIndex: 'SP005'},//品號
                  {name:'SP006',header:'作業', width:100, sortable: true, dataIndex: 'SP006'},//作業
                  {name:'SP009',header:'廠區', width:100, sortable: true, dataIndex: 'SP009'}//廠區
        ],
        stripeRows: true,
        width:335,
        height:300,
        tbar: ['SOP編號:', ' ',sp001TriggerField]
    });
    sp001TriggerField.onTriggerClick=function(){
    	sql_fun_sop(sp001TriggerField.getValue(),Ext.getCmp('SP003').getValue(),'SP001');
	}; 
	
	// 在開窗中選擇了資料
	sp001_Win_grid.on("celldblclick",function () {
    	var sp001=sp001_Win_grid.getSelectionModel().selected.first().get("SP001");
    	Ext.getCmp("SP001").setValue(sp001);
    	sp001formwin.hide();
     },this);
    var sp001formwin= new Ext.Window({
        width:380,
        height:350,
        closeAction:'hide',   
        plain: false,
        items: sp001_Win_grid,
        layout:'border',
        title:'SOP編號'
    });
    return sp001formwin;
}
//ATTRIBUTE_LIST跳窗_上方查詢
function sql_fun_attribute(value,al001){
    var dataObj=new Object();
    dataObj.Condition = " WHERE AL001 = '"+al001+"' AND AL002 LIKE '%"+value+"%' ";
    Ext.Ajax.request({
    	waitMsg: 'Please wait...',
    	url: "/eSOP/api/ajax/getATTRIBUTE_LIST01",
    	method:"POST",
    	params:{
    		data : Ext.encode(dataObj)
    	},
    	failure : function(xhr) {
    		Ext.MessageBox.alert('Ajax error', 'Ajax request 發生錯誤' + xhr);
    	},
    	success : function(response){
			response=Ext.decode(response.responseText);
			if (response != null){
				if(al001 == 3){
					factory_Win_grid.store.removeAll();
					factory_Win_grid.store.loadRawData(response, true);
				}else if(al001 == 1){
					item_Win_grid.store.removeAll();
					item_Win_grid.store.loadRawData(response, true);
				}else if(al001 == 2){
					operation_Win_grid.store.removeAll();
					operation_Win_grid.store.loadRawData(response, true);
				}
			}
		}
	});
}
//SOP跳窗_上方查詢
function sql_fun_sop(sp001,sp003,type){
    var dataObj=new Object();
    dataObj.Condition = " WHERE SP001 LIKE '%"+sp001+"%' AND SP003 LIKE '%"+sp003+"%' ";
    Ext.Ajax.request({
    	waitMsg: 'Please wait...',
    	url: "/eSOP/api/ajax/getSOP01",
    	method:"POST",
    	params:{
    		data : Ext.encode(dataObj)
    	},
    	failure : function(xhr) {
    		Ext.MessageBox.alert('Ajax error', 'Ajax request 發生錯誤' + xhr);
    	},
    	success : function(response){
			response=Ext.decode(response.responseText);
			if (response != null){
				if(type == 'SP003'){
					filename_Win_grid.store.removeAll();
					filename_Win_grid.store.loadRawData(response, true);
				}else if(type == 'SP001'){
					sp001_Win_grid.store.removeAll();
					sp001_Win_grid.store.loadRawData(response, true);
				}
			}
		}
	});
}
//建置新的 TriggerField
function getTriggerField(TriggerFieldId){
	var SelectWinQueryField=new Ext.form.TriggerField({ 
	    id:TriggerFieldId,
	    width:120,
	    triggerClass:'x-form-search-trigger'
	});
	SelectWinQueryField.on("specialkey",function(f, e){                   
        if(e.getKey() == e.ENTER){                        
        	SelectWinQueryField.onTriggerClick();                         
        }                                                  
    }, this); 
	return SelectWinQueryField;
}