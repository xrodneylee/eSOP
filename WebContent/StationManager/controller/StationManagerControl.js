/**
 * 
 */
var standardconditionData;
var vpHeight_c1 =Ext.getBody().getViewSize().height;
Ext.define('StationManager.controller.StationManagerControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			"#browseGridPanel": { 
				afterrender: this.onBrowseGridPanelAfterrender,
				itemdblclick: this.onBrowseGridPanelClick
            },
			'#excolCombobox': { // 欄位下拉式選單
                select: this.onexColComboboxSelect
            },
            '#search': {
                click: this.onSearch
            },
            '#previous' : {
            	click: this.onPrevious
            },
            '#next' : {
            	click: this.onNext
            },
            '#modi' : {
            	click: this.onModi
            },
            '#delete' : {
            	click: this.onDelete
            },
            '#add' : {
            	click : this.onAdd
            },
            '#save' : {
            	click : this.onSave
            },
            '#cancel' : {
            	click : this.onCancel
            },
            '#ST001' : {
            	blur : this.onST001Blur
            }
		});
	},
	onexColComboboxSelect : function (){ // 查詢視窗中的選擇欄位下拉式選單後，變換視窗中的查詢條件輸入框: 文字 or 數字 or 日期 or MappingComboBox
		var colnum = Ext.getCmp("excolCombobox").getValue();
		standardsetComboValue(colnum,Ext.getCmp("exstandardTextField"),Ext.getCmp("exstandardDateField"),
				Ext.getCmp("exstandardNumField"),Ext.getCmp("exconCombobox"));
    },
    onBrowseGridPanelAfterrender : function(component, eOpts){
    	// 查詢視窗的選擇欄位下拉式選單
		var standardcomboStore = new Ext.data.Store({
			autoDestroy: false,
		 	fields: ['value','name'],
		 	data: [{'value':'ST001','name':'工位編號'},
		 	       {'value':'ST002','name':'工位說明'},
		 	       {'value':'ST006','name':'失效'},
		 	       {'value':'ST004','name':'區域'},
		 	       {'value':'ST005','name':'廠區'},
		 	       {'value':'ST003','name':'MAC位址'}]
		});	
    	Ext.getCmp("excolCombobox").clearValue();
		Ext.getCmp("excolCombobox").bindStore(standardcomboStore);
		Ext.getCmp("excolCombobox").store.reload();
		Ext.getCmp("excolCombobox").setValue('ST001');
		standardsetComboValue('ST001',Ext.getCmp("exstandardTextField"),Ext.getCmp("exstandardDateField"),
				Ext.getCmp("exstandardNumField"),Ext.getCmp("exconCombobox"));
		// 定義 grid height
		Ext.getCmp("browseGridPanel").setHeight(vpHeight_c1-65);
		// 根據窗口大小變化調整尺寸
		Ext.EventManager.onWindowResize(function(w, h) {
			try {
				Ext.getCmp("browseGridPanel").setHeight(h-65);
			} catch (e) {
			}
		}, this, true);
		
		// 工廠Trigger
    	Ext.getCmp("ST005").onTriggerClick=function(){
    		if(factoryWin==undefined){
    			factoryWin=factory_Win();
    		}
    		sql_fun('',3);
			factoryWin.show();
    	};
    	// 工位區域Trigger
    	Ext.getCmp("ST004").onTriggerClick=function(){
    		if(areaWin==undefined){
    			areaWin=area_Win();
    		}
    		sql_fun('',4);
			areaWin.show();
    	};
    },
    onSearch : function(){
    	var col = Ext.getCmp("excolCombobox").getValue();
    	var con = Ext.getCmp("exconCombobox").getValue();
    	var v = Ext.getCmp("exconCombobox").getValue();
    	
    	if(col == 'ST001' || col == 'ST002' || col == 'ST003' || col == 'ST004' || col == 'ST005'){
    		v=Ext.getCmp("exstandardTextField").getValue();
		}else if(col == 'ST006'){
			if(Ext.getCmp("exstandardTextField").getValue() == 'V'){
				v = 'N';
			}else{
				v = 'Y';
			}
		}else if(col == ''){
			v=Ext.getCmp("exstandardNumField").getValue();
		}else if(col == ''){
			v=Ext.getCmp("exstandardDateField").getValue();
			v=v.replace("-","/").replace("-","/");
			columeName="CONVERT(varchar(12), "+columeName+", 111)";
		}
    	
    	var wherecon='ISNULL('+col + ',\'\')';
    	
		if(con =="%like"){
			wherecon+=" like '"+v+"%'"+'\n';
		}else if(con =="like%"){
			wherecon+=" like '%"+v+"'"+'\n';
		}else if(con =="not like"){
			wherecon+=" not like '%"+v+"%'"+'\n';
		}else if(con =="like"){
			wherecon+=" like '%"+v+"%'"+'\n';
		}else{
			wherecon+=" "+con+" '"+v+"'"+'\n';
		}
		
		if (wherecon!='')
			wherecon = ' and '+wherecon;
		goSearch(wherecon);
    },
    onBrowseGridPanelClick : function(component, record, item, index, e, eOpts){
    	changeRowData(index);
    	Ext.getCmp("StationManagerTabpanel").setActiveTab(1);
    },
    onPrevious : function(){
    	var selected = Ext.getCmp("browseGridPanel").getSelectionModel().selected.first();
        var store = Ext.data.StoreManager.lookup('browseJsonStore');
        var idx = store.indexOf(selected);
        Ext.getCmp("browseGridPanel").getSelectionModel().select(idx - 1);
        changeRowData(idx - 1);
        Ext.getCmp('add').setDisabled(false);
    	Ext.getCmp('modi').setDisabled(false);
    	Ext.getCmp('delete').setDisabled(false);
    	Ext.getCmp('save').setDisabled(true);
    	Ext.getCmp('cancel').setDisabled(true);
    	Ext.getCmp('ST001').setDisabled(true);
    	Ext.getCmp('ST002').setDisabled(true);
    	Ext.getCmp('ST003').setDisabled(true);
    	Ext.getCmp('ST004').setDisabled(true);
    	Ext.getCmp('ST005').setDisabled(true);
    	Ext.getCmp('ST006').setDisabled(true);
    },
    onNext : function(){
    	var selected = Ext.getCmp("browseGridPanel").getSelectionModel().selected.first();
        var store = Ext.data.StoreManager.lookup('browseJsonStore');
        var idx = store.indexOf(selected);
        Ext.getCmp("browseGridPanel").getSelectionModel().select(idx + 1);
        changeRowData(idx + 1);
        Ext.getCmp('add').setDisabled(false);
    	Ext.getCmp('modi').setDisabled(false);
    	Ext.getCmp('delete').setDisabled(false);
    	Ext.getCmp('save').setDisabled(true);
    	Ext.getCmp('cancel').setDisabled(true);
    	Ext.getCmp('ST001').setDisabled(true);
    	Ext.getCmp('ST002').setDisabled(true);
    	Ext.getCmp('ST003').setDisabled(true);
    	Ext.getCmp('ST004').setDisabled(true);
    	Ext.getCmp('ST005').setDisabled(true);
    	Ext.getCmp('ST006').setDisabled(true);
    },
    onModi : function(){
    	Ext.getCmp('add').setDisabled(true);
    	Ext.getCmp('modi').setDisabled(true);
    	Ext.getCmp('delete').setDisabled(true);
    	Ext.getCmp('save').setDisabled(false);
    	Ext.getCmp('cancel').setDisabled(false);
    	Ext.getCmp('ST001').setDisabled(true);
    	Ext.getCmp('ST002').setDisabled(false);
    	Ext.getCmp('ST003').setDisabled(false);
    	Ext.getCmp('ST004').setDisabled(false);
    	Ext.getCmp('ST005').setDisabled(false);
    	Ext.getCmp('ST006').setDisabled(false);
    },
    onDelete : function(){
    	var deleteInfo = new Object();
    	deleteInfo.AUTH_ID = Ext.getCmp('ST001').getValue();
    	Ext.Msg.confirm("", "確定刪除此筆資料?", function(btnText){
            if(btnText === "yes"){
            	Ext.Ajax.request({
        			waitMsg: 'Please wait...',
        			url : '/eSOP/api/ajax/deleteUser_STATION',
        		    method : "POST",
        		    params :{
        				data : Ext.encode(deleteInfo)
        			},
        		    success : function (response) {
        		    	response = Ext.decode(response.responseText);
        		    	if(response.result == "success"){
        		    		Ext.Msg.alert('','刪除成功');
        		    		cleanData();
        		    		Ext.getCmp("StationManagerTabpanel").setActiveTab(0);
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
    },
    onAdd : function(){
    	Ext.getCmp("ST001").setValue('');
    	Ext.getCmp("ST002").setValue('');
    	Ext.getCmp("ST003").setValue('');
    	Ext.getCmp("ST004").setValue('');
    	Ext.getCmp("ST005").setValue('');
    	Ext.getCmp("ST006").setValue(false);
    	
    	Ext.getCmp('add').setDisabled(true);
    	Ext.getCmp('modi').setDisabled(true);
    	Ext.getCmp('delete').setDisabled(true);
    	Ext.getCmp('save').setDisabled(false);
    	Ext.getCmp('cancel').setDisabled(false);
    	Ext.getCmp('ST001').setDisabled(false);
    	Ext.getCmp('ST002').setDisabled(false);
    	Ext.getCmp('ST003').setDisabled(false);
    	Ext.getCmp('ST004').setDisabled(false);
    	Ext.getCmp('ST005').setDisabled(false);
    	Ext.getCmp('ST006').setDisabled(false);
    },
    onSave : function(){
    	if(Ext.getCmp('ST001').getValue() == ''){
    		Ext.Msg.alert('','工位編號不可空白');
    		return;
    	}
    	var saveInfo = new Object();
    	saveInfo.ST001 = Ext.getCmp('ST001').getValue();
    	saveInfo.ST002 = Ext.getCmp('ST002').getValue();
    	saveInfo.ST003 = Ext.getCmp('ST003').getValue();
    	saveInfo.ST004 = Ext.getCmp('ST004').getValue();
    	saveInfo.ST005 = Ext.getCmp('ST005').getValue();
    	if(Ext.getCmp('ST006').getValue()){
    		saveInfo.ST006 = 'N';
    	}else{
    		saveInfo.ST006 = 'Y';
    	}
    	
    	Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url : '/eSOP/api/ajax/saveUser_STATION',
		    method : "POST",
		    params :{
				data : Ext.encode(saveInfo)
			},
		    success : function (response) {
		    	response = Ext.decode(response.responseText);
		    	if(response.result == "success"){
		    		Ext.Msg.alert('','儲存完畢');
		    		Ext.getCmp('ST001').setDisabled(true);
		    		Ext.getCmp("ST002").setDisabled(true);
		    		Ext.getCmp("ST003").setDisabled(true);
		    		Ext.getCmp('ST004').setDisabled(true);
		    		Ext.getCmp("ST005").setDisabled(true);
		    		Ext.getCmp("ST006").setDisabled(true);
		    		cleanData();
		    	}else{
		    		Ext.Msg.alert('更新失敗',response.msg);
		    	}
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','儲存失敗');
		    }
		});
    },
    onCancel : function(){
    	try{
    		var selected = Ext.getCmp("browseGridPanel").getSelectionModel().selected.first();
            var store = Ext.data.StoreManager.lookup('browseJsonStore');
            var idx = store.indexOf(selected);
            changeRowData(idx);
            Ext.getCmp('save').setDisabled(true);
        	Ext.getCmp('cancel').setDisabled(true);
    	}catch(e){
    		cleanData();
    		Ext.getCmp('ST001').setDisabled(true);
    		Ext.getCmp('ST002').setDisabled(true);
    		Ext.getCmp('ST003').setDisabled(true);
    		Ext.getCmp('ST004').setDisabled(true);
    		Ext.getCmp('ST005').setDisabled(true);
    		Ext.getCmp('ST006').setDisabled(true);
    	}
    },
    onST001Blur : function(component, The, eOpts){
    	var store = Ext.data.StoreManager.lookup('browseJsonStore');
    	for(var i = 0; i < store.totalCount; i++){
    		var record = store.getAt(i);
    		if(record.get("ST001") == component.getValue()){
    			Ext.Msg.alert('','工位編號已存在，請重新輸入!');
    			component.setValue('');
    		}
    	}

    }
});

//初始化介面的查詢條件輸入框: 文字 or 數字 or 日期 or MappingComboBox
function standardsetComboValue(id,act1,act2,act3,conCombo){
	act1.setValue("");
	act2.setValue("");
	act3.setValue("");
    var condata=standardconditionData;
    var returnAct;
    if(id==''){
		condata=[{'name':'大於','value':'>'},{'name':'大於等於','value':'>='},
		{'name':'小於','value':'<'},{'name':'小於等於','value':'<='},
		{'name':'等於','value':'='},{'name':'不等於','value':'<>'}];
		act1.hide();
		act1.setDisabled(false);
    	conCombo.setDisabled(false);
		act2.hide();
		act3.show();
		returnAct=act3;
	}else if(id==''){
		condata=[{'name':'大於','value':'>'},{'name':'大於等於','value':'>='},
		{'name':'小於','value':'<'},{'name':'小於等於','value':'<='},
		{'name':'等於','value':'='},{'name':'不等於','value':'<>'}];
		act1.hide();
		act1.setDisabled(false);
    	conCombo.setDisabled(false);
		act2.show();
		act3.hide();
		returnAct=act2;
	}else{
		// 載入預設的查詢條件:包含、字首為、字尾為、大於、大於等於、小於、小於等於、等於、不等於、不包含，設置 ComboBox
		condata=[{'name':'包含','value':'like'},{'name':'字首為','value':'%like'},
	               {'name':'字尾為','value':'like%'},{'name':'大於','value':'>'},
	               {'name':'大於等於','value':'>='},{'name':'小於','value':'<'},
	               {'name':'小於等於','value':'<='},{'name':'等於','value':'='},
	               {'name':'不等於','value':'<>'},{'name':'不包含','value':'not like'}];
		act1.show();
		act1.setDisabled(false);
    	conCombo.setDisabled(false);
		act2.hide();
		act3.hide();
		returnAct=act1;
	}
    standardconditionData = condata;
    standardconditionstore = new Ext.data.Store({
    	autoDestroy: false,
    	fields: ['name','value'],
    	data :  standardconditionData
    });   
    conCombo.clearValue();
	conCombo.bindStore(standardconditionstore);
	conCombo.store.reload();
	conCombo.setValue(standardconditionData[0].value);
	return returnAct;
}

function goSearch(wherecon) { 
	var dataObj=new Object();
    dataObj.wherecon = wherecon;
    Ext.Ajax.request({
    	waitMsg: 'Please wait...',
    	url: "/eSOP/api/ajax/getSTATION_search",
    	method:"POST",
    	params:{
    		data : Ext.encode(dataObj)
    	},
    	failure : function(response) {
    		Ext.MessageBox.alert('Ajax error', 'Ajax request 發生錯誤' + response);
    	},
    	success : function(response){
			response=Ext.decode(response.responseText);
    		Ext.getCmp('browseGridPanel').getStore().loadData(response.STATION);
		}
	});
}

function changeRowData(index){
	var store = Ext.data.StoreManager.lookup('browseJsonStore');
	var record = store.getAt(index);
	Ext.getCmp('ST001').setValue(record.get("ST001"));
	Ext.getCmp('ST002').setValue(record.get("ST002"));
	Ext.getCmp('ST003').setValue(record.get("ST003"));
	Ext.getCmp('ST004').setValue(record.get("ST004"));
	Ext.getCmp('ST005').setValue(record.get("ST005"));
	if(record.get("ST006") == "N"){
		Ext.getCmp('ST006').setValue(true);
	}else{
		Ext.getCmp('ST006').setValue(false);
	}
	
	Ext.getCmp("modi").setDisabled(false);
	Ext.getCmp("delete").setDisabled(false);
	Ext.getCmp("add").setDisabled(false);
	
	Ext.getCmp('ST001').setDisabled(true);
	Ext.getCmp('ST002').setDisabled(true);
	Ext.getCmp('ST003').setDisabled(true);
	Ext.getCmp('ST004').setDisabled(true);
	Ext.getCmp('ST005').setDisabled(true);
	Ext.getCmp('ST006').setDisabled(true);
}

function cleanData(){
	Ext.getCmp("ST001").setValue('');
	Ext.getCmp("ST002").setValue('');
	Ext.getCmp("ST003").setValue('');
	Ext.getCmp("ST004").setValue('');
	Ext.getCmp("ST005").setValue('');
	Ext.getCmp("ST006").setValue(false);
	
	Ext.getCmp("add").setDisabled(false);
	Ext.getCmp("modi").setDisabled(true);
	Ext.getCmp("delete").setDisabled(true);
	Ext.getCmp("save").setDisabled(true);
	Ext.getCmp("cancel").setDisabled(true);
	
	Ext.getCmp("browseGridPanel").getStore().load();
}

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
    	sql_fun(factoryTriggerField.getValue(),3);
	}; 
	
	// 在開窗中選擇了資料
	factory_Win_grid.on("celldblclick",function () {
    	var al002=factory_Win_grid.getSelectionModel().selected.first().get("AL002");
    	Ext.getCmp("ST005").setValue(al002);
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
//區域_跳窗_建置
var area_Win_grid, areaWin;
function area_Win(){
	var areaTriggerField=getTriggerField('areaTriggerField');
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
    area_Win_grid = new Ext.grid.GridPanel({
    	id:'area_Win_grid',
        store: store,
        region:'center',
        columns: [
                  {name:'AL002',header:'工位區域', width:100, sortable: true, dataIndex: 'AL002'},//屬性值
                  {name:'AL003',header:'備註', width:100, sortable: true, dataIndex: 'AL003'}//備註
        ],
        stripeRows: true,
        width:335,
        height:300,
        tbar: ['工位區域:', ' ',areaTriggerField]
    });
    areaTriggerField.onTriggerClick=function(){
    	sql_fun(areaTriggerField.getValue(),4);
	}; 
	
	// 在開窗中選擇了資料
	area_Win_grid.on("celldblclick",function () {
    	var al002=area_Win_grid.getSelectionModel().selected.first().get("AL002");
    	Ext.getCmp("ST004").setValue(al002);
    	areaformwin.hide();
     },this);
    var areaformwin= new Ext.Window({
        width:380,
        height:350,
        closeAction:'hide',   
        plain: false,
        items: area_Win_grid,
        layout:'border',
        title:'工位區域'
    });
    return areaformwin;
}

// 跳窗_上方查詢
function sql_fun(value,al001){
    var dataObj=new Object();
    dataObj.Condition = " WHERE AL001 = '"+al001+"' AND AL002 LIKE '%"+value+"%' ";
    Ext.Ajax.request({
    	waitMsg: 'Please wait...',
    	url: "/eSOP/api/ajax/getATTRIBUTE_LIST01",
    	method:"POST",
    	params:{
    		data : Ext.encode(dataObj)
    	},
    	error : function(xhr) {
    		Ext.MessageBox.alert('Ajax error', 'Ajax request 發生錯誤' + xhr);
    	},
    	success : function(response){
			response=Ext.decode(response.responseText);
			if (response != null){
				if(al001 == 3){
					factory_Win_grid.store.removeAll();
					factory_Win_grid.store.loadRawData(response, true);
				}else if(al001 == 4){
					area_Win_grid.store.removeAll();
					area_Win_grid.store.loadRawData(response, true);
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