/**
 * 
 */
var standardconditionData;
var vpHeight_c1 =Ext.getBody().getViewSize().height;
Ext.define('LoginCreater.controller.LoginCreaterControl', {
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
            '#AUTH_ID' : {
            	blur : this.onAUTH_IDBlur
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
		 	data: [{'value':'AUTH_ID','name':'登入者代號'},
		 	       {'value':'AUTH_NAME','name':'名稱'}]
		});	
    	Ext.getCmp("excolCombobox").clearValue();
		Ext.getCmp("excolCombobox").bindStore(standardcomboStore);
		Ext.getCmp("excolCombobox").store.reload();
		Ext.getCmp("excolCombobox").setValue('AUTH_ID');
		standardsetComboValue('AUTH_ID',Ext.getCmp("exstandardTextField"),Ext.getCmp("exstandardDateField"),
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
    },
    onSearch : function(){
    	var col = Ext.getCmp("excolCombobox").getValue();
    	var con = Ext.getCmp("exconCombobox").getValue();
    	var v = Ext.getCmp("exconCombobox").getValue();
    	
    	if(col == 'AUTH_ID' || col == 'AUTH_NAME'){
    		v=Ext.getCmp("exstandardTextField").getValue();
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
    	Ext.getCmp("LoginCreaterTabpanel").setActiveTab(1);
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
    	Ext.getCmp('AUTH_ID').setDisabled(true);
    	Ext.getCmp('AUTH_NAME').setDisabled(true);
    	Ext.getCmp('AUTH_PASSWORD').setDisabled(true);
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
    	Ext.getCmp('AUTH_ID').setDisabled(true);
    	Ext.getCmp('AUTH_NAME').setDisabled(true);
    	Ext.getCmp('AUTH_PASSWORD').setDisabled(true);
    },
    onModi : function(){
    	Ext.getCmp('add').setDisabled(true);
    	Ext.getCmp('modi').setDisabled(true);
    	Ext.getCmp('delete').setDisabled(true);
    	Ext.getCmp('save').setDisabled(false);
    	Ext.getCmp('cancel').setDisabled(false);
    	Ext.getCmp('AUTH_ID').setDisabled(true);
    	Ext.getCmp('AUTH_NAME').setDisabled(false);
    	Ext.getCmp('AUTH_PASSWORD').setDisabled(false);
    },
    onDelete : function(){
    	var deleteInfo = new Object();
    	deleteInfo.AUTH_ID = Ext.getCmp('AUTH_ID').getValue();
    	Ext.Msg.confirm("", "確定刪除此筆資料?", function(btnText){
            if(btnText === "yes"){
            	Ext.Ajax.request({
        			waitMsg: 'Please wait...',
        			url : '/eSOP/api/ajax/deleteUser_PRINCIPAL',
        		    method : "POST",
        		    params :{
        				data : Ext.encode(deleteInfo)
        			},
        		    success : function (response) {
        		    	response = Ext.decode(response.responseText);
        		    	if(response.result == "success"){
        		    		Ext.Msg.alert('','刪除成功');
        		    		cleanData();
        		    		Ext.getCmp("LoginCreaterTabpanel").setActiveTab(0);
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
    	Ext.getCmp("AUTH_ID").setValue('');
    	Ext.getCmp("AUTH_NAME").setValue('');
    	Ext.getCmp("AUTH_PASSWORD").setValue('');
    	
    	Ext.getCmp('add').setDisabled(true);
    	Ext.getCmp('modi').setDisabled(true);
    	Ext.getCmp('delete').setDisabled(true);
    	Ext.getCmp('save').setDisabled(false);
    	Ext.getCmp('cancel').setDisabled(false);
    	Ext.getCmp('AUTH_ID').setDisabled(false);
    	Ext.getCmp('AUTH_NAME').setDisabled(false);
    	Ext.getCmp('AUTH_PASSWORD').setDisabled(false);
    },
    onSave : function(){
    	if(Ext.getCmp('AUTH_ID').getValue() == ''){
    		Ext.Msg.alert('','登入者代號不可空白');
    		return;
    	}
    	var saveInfo = new Object();
    	saveInfo.AUTH_ID = Ext.getCmp('AUTH_ID').getValue();
    	saveInfo.AUTH_NAME = Ext.getCmp('AUTH_NAME').getValue();
    	saveInfo.AUTH_PASSWORD = Ext.getCmp('AUTH_PASSWORD').getValue();
    	saveInfo.USERID = userID;
    	
    	Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url : '/eSOP/api/ajax/saveUser_PRINCIPAL',
		    method : "POST",
		    params :{
				data : Ext.encode(saveInfo)
			},
		    success : function (response) {
		    	response = Ext.decode(response.responseText);
		    	if(response.result == "success"){
		    		Ext.Msg.alert('','儲存完畢');
		    		Ext.getCmp('AUTH_ID').setDisabled(true);
		    		Ext.getCmp("AUTH_NAME").setDisabled(true);
		    		Ext.getCmp("AUTH_PASSWORD").setDisabled(true);
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
    		Ext.getCmp('AUTH_ID').setDisabled(true);
    		Ext.getCmp('AUTH_NAME').setDisabled(true);
    		Ext.getCmp('AUTH_PASSWORD').setDisabled(true);
    	}
    },
    onAUTH_IDBlur : function(component, The, eOpts){
    	var store = Ext.data.StoreManager.lookup('browseJsonStore');
    	for(var i = 0; i < store.totalCount; i++){
    		var record = store.getAt(i);
    		if(record.get("AUTH_ID") == component.getValue()){
    			Ext.Msg.alert('','登入者代號已存在，請重新輸入!');
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
    	url: "/eSOP/api/ajax/getPRINCIPAL_search",
    	method:"POST",
    	params:{
    		data : Ext.encode(dataObj)
    	},
    	failure : function(response) {
    		Ext.MessageBox.alert('Ajax error', 'Ajax request 發生錯誤' + response);
    	},
    	success : function(response){
			response=Ext.decode(response.responseText);
    		Ext.getCmp('browseGridPanel').getStore().loadData(response.PRINCIPAL);
		}
	});
}

function changeRowData(index){
	var store = Ext.data.StoreManager.lookup('browseJsonStore');
	var record = store.getAt(index);
	Ext.getCmp('AUTH_ID').setValue(record.get("AUTH_ID"));
	Ext.getCmp('AUTH_NAME').setValue(record.get("AUTH_NAME"));
	Ext.getCmp('AUTH_PASSWORD').setValue(record.get("AUTH_PASSWORD"));
	Ext.getCmp("modi").setDisabled(false);
	Ext.getCmp("delete").setDisabled(false);
	Ext.getCmp("add").setDisabled(false);
	
	Ext.getCmp('AUTH_ID').setDisabled(true);
	Ext.getCmp('AUTH_NAME').setDisabled(true);
	Ext.getCmp('AUTH_PASSWORD').setDisabled(true);
}

function cleanData(){
	Ext.getCmp("AUTH_ID").setValue('');
	Ext.getCmp("AUTH_NAME").setValue('');
	Ext.getCmp("AUTH_PASSWORD").setValue('');
	
	Ext.getCmp("add").setDisabled(false);
	Ext.getCmp("modi").setDisabled(true);
	Ext.getCmp("delete").setDisabled(true);
	Ext.getCmp("save").setDisabled(true);
	Ext.getCmp("cancel").setDisabled(true);
	
	Ext.getCmp("browseGridPanel").getStore().load();
}