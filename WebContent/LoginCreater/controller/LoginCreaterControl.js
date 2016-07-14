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
				afterrender: this.onBrowseGridPanelAfterrender
            },
			'#excolCombobox': { // 欄位下拉式選單
                select: this.onexColComboboxSelect
            },
            '#search': {
                click: this.onSearch
            },
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
    	console.log(Ext.getCmp("excolCombobox").getValue());
    	console.log(Ext.getCmp("exconCombobox").getValue());
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