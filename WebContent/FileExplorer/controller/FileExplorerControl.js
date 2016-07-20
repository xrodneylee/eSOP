/**
 * 
 */
var vpHeight_c1 =Ext.getBody().getViewSize().height;
var vpWidth_c1 =Ext.getBody().getViewSize().width;
var selectIndex;
Ext.define('FileExplorer.controller.FileExplorerControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#browseGridPanel' : {
				afterrender : this.onBrowseGridPanelAfterrender,
				cellclick : this.onbrowseGridPanelCellclick
			},
			'#clean' : {
				click : this.onClean
			},
			'#query' : {
				click : this.onQuery
			},
			'#add' : {
				click : this.onAdd
			},
			'#delete' : {
				click : this.onDelete
			},
			'#save' : {
				click : this.onSave
			},
			'#SP003_editor' : {
				beforerender : this.SP003_editorBeforerender
			},
			'#SP005_editor' : {
				beforerender : this.SP005_editorBeforerender
			},
			'#SP006_editor' : {
				beforerender : this.SP006_editorBeforerender
			},
			'#SP009_editor' : {
				beforerender : this.SP009_editorBeforerender
			},
			'#upload' : {
				click : this.onUpload
			}
		});
	},
	onbrowseGridPanelCellclick : function(component, td, cellIndex, record, tr, rowIndex, e, eOpts){
		selectIndex = rowIndex;
	},
	SP003_editorBeforerender : function(component, eOpts){
		// 實體檔案Trigger
    	Ext.getCmp("SP003_editor").onTriggerClick=function(){
    		if(sp003Win==undefined){
    			sp003Win=sp003_Win_editor();
    		}
    		Ext.getCmp('uploadField').reset();
    		sp003Win.show();
    	};
	},
	SP005_editorBeforerender : function(component, eOpts){
		// 品號Trigger
    	Ext.getCmp("SP005_editor").onTriggerClick=function(){
    		if(itemWin_editor==undefined){
    			itemWin_editor=item_Win_editor();
    		}
    		sql_fun_attribute('',1,'grid');
    		itemWin_editor.show();
    	};
	},
	SP006_editorBeforerender : function(component, eOpts){
		// 作業Trigger
		Ext.getCmp("SP006_editor").onTriggerClick=function(){
    		if(operationWin_editor==undefined){
    			operationWin_editor=operation_Win_editor();
    		}
    		sql_fun_attribute('',2,'grid');
    		operationWin_editor.show();
    	};
	},
	SP009_editorBeforerender : function(component, eOpts){
		// 工廠Trigger
    	Ext.getCmp("SP009_editor").onTriggerClick=function(){
    		if(factoryWin_editor==undefined){
    			factoryWin_editor=factory_Win_editor();
    		}
    		sql_fun_attribute('',3,'grid');
			factoryWin_editor.show();
    	};
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
    		sql_fun_attribute('',3,'header');
			factoryWin.show();
    	};
    	// 品號Trigger
    	Ext.getCmp("AL002@1").onTriggerClick=function(){
    		if(itemWin==undefined){
    			itemWin=item_Win();
    		}
    		sql_fun_attribute('',1,'header');
    		itemWin.show();
    	};
    	// 作業Trigger
    	Ext.getCmp("AL002@2").onTriggerClick=function(){
    		if(operationWin==undefined){
    			operationWin=operation_Win();
    		}
    		sql_fun_attribute('',2,'header');
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
	},
	onAdd : function(){
		var store = Ext.getCmp('browseGridPanel').getStore();
    	var data = store.getRange();
    	var p = [{'exist':'','SP003':'','SP010':'','SP001':'','SP002':'','SP004':'',
			  'SP005':'','SP007':'','SP006':'','SP008':'0','SP009':''}];
    	store.insert(data.length, p);
	},
	onDelete : function(){
		var data = Ext.getCmp('browseGridPanel').getStore().getRange();
    	var selections = Ext.getCmp('browseGridPanel').getSelectionModel().getSelection();
    	if(selections.length > 0){
    		Ext.Msg.confirm("", "刪除選取的紀錄共 "+selections.length+" 筆，請問是否確定？", function(btnText){
                if(btnText === "yes"){
                	var record = new Object();
                	var deleteInfo = new Array();
                	var index = 0;
                	for(var i = 0; i < selections.length; i++){
                		if(selections[i].get('exist') == 'Y'){
                			var record = new Object();
                			record.SP001 = selections[i].get('SP001');
                			record.SP002 = selections[i].get('SP002');
                			deleteInfo[index]=record;
                			index++;
                		}
                	}
                	Ext.Ajax.request({
            			waitMsg: 'Please wait...',
            			url : '/eSOP/api/ajax/deleteSOP',
            		    method : "POST",
            		    params :{
            				data : Ext.encode(deleteInfo)
            			},
            		    success : function (response) {
            		    	response = Ext.decode(response.responseText);
            		    	if(response.result == "success"){
            		    		for(var i = 0; i < data.length; i++){
                            		for(var j = 0; j < selections.length; j++){
                            			if((selections[j].get('SP001') == data[i].get('SP001')) && (selections[j].get('SP002') == data[i].get('SP002'))){
                            				Ext.getCmp('browseGridPanel').getStore().remove(data[i]);
                            			}
                            		}
                            	}
            		    		Ext.Msg.alert('','刪除成功');
            		    	}else{
            		    		Ext.Msg.alert('更新失敗',response.msg);
            		    	}
            		    },
            		    failure : function (response) {
            		    	Ext.Msg.alert('','儲存失敗');
            		    }
            		});
                }
            }, this);
    	}
	},
	onSave : function(){
		var data = Ext.getCmp('browseGridPanel').getStore().getRange();
		var saveInfo = new Array();
		for(var i = 0; i < data.length; i++){
			var record = new Object();
			record.exist = data[i].get('exist');
			record.SP001 = data[i].get('SP001');
			record.SP002 = data[i].get('SP002');
			record.SP003 = data[i].get('SP003');
			record.SP004 = data[i].get('SP004');
			record.SP005 = data[i].get('SP005');
			record.SP006 = data[i].get('SP006');
			record.SP007 = data[i].get('SP007');
			record.SP008 = data[i].get('SP008');
			record.SP009 = data[i].get('SP009');
			record.SP010 = data[i].get('SP010');
			record.USERID = userID;
			saveInfo[i] = record;
		}
		Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url : '/eSOP/api/ajax/saveSOP',
		    method : "POST",
		    params :{
				data : Ext.encode(saveInfo)
			},
		    success : function (response) {
//		    	response = Ext.decode(response.responseText);
		    	Ext.getCmp("query").fireEvent('click', 0) ;
		    	Ext.Msg.alert('','儲存成功');
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','儲存失敗');
		    }
		});
	},
	onUpload : function(){
		sp003_form.getForm().submit({
            url: '/eSOP/api/ajax/upload',
            waitMsg: '上傳中...'
        });
		var data = Ext.getCmp('browseGridPanel').getStore().getRange();
		var path = Ext.getCmp('uploadField').getValue()
		var fileName = path.substring(path.lastIndexOf('\\') + 1);
        data[selectIndex].set("SP003", fileName);
		sp003Win.hide();
	}
});
//工廠_跳窗_建置
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
    	sql_fun_attribute(factoryTriggerField.getValue(),3,'header');
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
//工廠_跳窗_建置_editor
var factory_Win_grid_editor, factoryWin_editor;
function factory_Win_editor(){
	var factoryTriggerField_editor=getTriggerField('factoryTriggerField_editor');
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
    factory_Win_grid_editor = new Ext.grid.GridPanel({
    	id:'factory_Win_grid_editor',
        store: store,
        region:'center',
        columns: [
                  {name:'AL002',header:'工廠', width:100, sortable: true, dataIndex: 'AL002'},//屬性值
                  {name:'AL003',header:'備註', width:100, sortable: true, dataIndex: 'AL003'}//備註
        ],
        stripeRows: true,
        width:335,
        height:300,
        tbar: ['工廠:', ' ',factoryTriggerField_editor]
    });
    factoryTriggerField_editor.onTriggerClick=function(){
    	sql_fun_attribute(factoryTriggerField_editor.getValue(),3,'grid');
	}; 
	
	// 在開窗中選擇了資料
	factory_Win_grid_editor.on("celldblclick",function () {
    	var al002=factory_Win_grid_editor.getSelectionModel().selected.first().get("AL002");
    	var data = Ext.getCmp('browseGridPanel').getStore().getRange();
        data[selectIndex].set("SP009", al002);
    	factoryformwin_editor.hide();
     },this);
    var factoryformwin_editor= new Ext.Window({
        width:380,
        height:350,
        closeAction:'hide',   
        plain: false,
        items: factory_Win_grid_editor,
        layout:'border',
        title:'工廠'
    });
    return factoryformwin_editor;
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
    	sql_fun_attribute(itemTriggerField.getValue(),1,'header');
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
}//品號_跳窗_建置_editor
var item_Win_grid_editor, itemWin_editor;
function item_Win_editor(){
	var itemTriggerField_editor=getTriggerField('itemTriggerField_editor');
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
    item_Win_grid_editor = new Ext.grid.GridPanel({
    	id:'item_Win_grid_editor',
        store: store,
        region:'center',
        columns: [
                  {name:'AL002',header:'品號', width:100, sortable: true, dataIndex: 'AL002'},//屬性值
                  {name:'AL003',header:'備註', width:100, sortable: true, dataIndex: 'AL003'}//備註
        ],
        stripeRows: true,
        width:335,
        height:300,
        tbar: ['品號:', ' ',itemTriggerField_editor]
    });
    itemTriggerField_editor.onTriggerClick=function(){
    	sql_fun_attribute(itemTriggerField_editor.getValue(),1,'grid');
	}; 
	
	// 在開窗中選擇了資料
	item_Win_grid_editor.on("celldblclick",function () {
    	var al002=item_Win_grid_editor.getSelectionModel().selected.first().get("AL002");
    	var data = Ext.getCmp('browseGridPanel').getStore().getRange();
        data[selectIndex].set("SP005", al002);
    	itemformwin_editor.hide();
     },this);
    var itemformwin_editor= new Ext.Window({
        width:380,
        height:350,
        closeAction:'hide',   
        plain: false,
        items: item_Win_grid_editor,
        layout:'border',
        title:'品號'
    });
    return itemformwin_editor;
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
    	sql_fun_attribute(operationTriggerField.getValue(),1,'header');
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
//作業_跳窗_建置_editor
var operation_Win_grid_editor, operationWin_editor;
function operation_Win_editor(){
	var operationTriggerField_editor=getTriggerField('operationTriggerField_editor');
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
    operation_Win_grid_editor = new Ext.grid.GridPanel({
    	id:'operation_Win_grid_editor',
        store: store,
        region:'center',
        columns: [
                  {name:'AL002',header:'作業', width:100, sortable: true, dataIndex: 'AL002'},//屬性值
                  {name:'AL003',header:'備註', width:100, sortable: true, dataIndex: 'AL003'}//備註
        ],
        stripeRows: true,
        width:335,
        height:300,
        tbar: ['作業:', ' ',operationTriggerField_editor]
    });
    operationTriggerField_editor.onTriggerClick=function(){
    	sql_fun_attribute(operationTriggerField_editor.getValue(),1,'grid');
	}; 
	
	// 在開窗中選擇了資料
	operation_Win_grid_editor.on("celldblclick",function () {
    	var al002=operation_Win_grid_editor.getSelectionModel().selected.first().get("AL002");
    	var data = Ext.getCmp('browseGridPanel').getStore().getRange();
        data[selectIndex].set("SP006", al002);
    	operationformwin_editor.hide();
     },this);
    var operationformwin_editor= new Ext.Window({
        width:380,
        height:350,
        closeAction:'hide',   
        plain: false,
        items: operation_Win_grid_editor,
        layout:'border',
        title:'作業'
    });
    return operationformwin_editor;
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
var sp003Win,sp003_form;
function sp003_Win_editor(){
	sp003_form = Ext.create('Ext.form.Panel', {
		id : 'sp003_form',
		frame : true,
		style : 'border-width: 0px;',
		tbar : [{
			xtype : 'button',
			text : '上傳',
			id : 'upload',
			iconCls : 'icon-up'
		}],
		items: [{
			xtype : 'fileuploadfield',
			id : 'uploadField',
			name : 'file',
			buttonText: '瀏覽...',
			allowBlank: false
	    }],
	});
    var sp003formwin_editor= new Ext.Window({
        width:300,
        height:100,
        closeAction:'hide', 
        layout : 'fit',
        plain: false,
        items: sp003_form,
        layout:'border',
        title:'檔案上傳'
    });
    return sp003formwin_editor;
}
//ATTRIBUTE_LIST跳窗_上方查詢
function sql_fun_attribute(value,al001,type){
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
				if(type == 'header'){
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
				}else if(type == 'grid'){
					if(al001 == 3){
						factory_Win_grid_editor.store.removeAll();
						factory_Win_grid_editor.store.loadRawData(response, true);
					}else if(al001 == 1){
						item_Win_grid_editor.store.removeAll();
						item_Win_grid_editor.store.loadRawData(response, true);
					}else if(al001 == 2){
						operation_Win_grid_editor.store.removeAll();
						operation_Win_grid_editor.store.loadRawData(response, true);
					}
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