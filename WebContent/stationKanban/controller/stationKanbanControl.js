/**
 * 
 */
var vpHeight_c1 =Ext.getBody().getViewSize().height;
Ext.define('stationKanban.controller.stationKanbanControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#stationKanbanPanel' : {
				afterrender : this.stationKanbanPanelAfterrender
			},
			'#query' : {
				click : this.onQuery
			}
		});
	},
	stationKanbanPanelAfterrender : function(component, eOpts){
		// 工廠Trigger
    	Ext.getCmp("factory").onTriggerClick=function(){
    		if(factoryWin==undefined){
    			factoryWin=factory_Win();
    		}
    		sql_fun('',3);
			factoryWin.show();
    	};
    	// 工位區域Trigger
    	Ext.getCmp("area").onTriggerClick=function(){
    		if(areaWin==undefined){
    			areaWin=area_Win();
    		}
    		sql_fun('',4);
			areaWin.show();
    	};
    	
    	Ext.getCmp("stationKanbanPanel").setHeight(vpHeight_c1);
    	Ext.getCmp("stationKanban").setHeight(vpHeight_c1-50);
		Ext.EventManager.onWindowResize(function(w, h) {
			try {
				Ext.getCmp("stationKanbanPanel").setHeight(h);
				Ext.getCmp("stationKanban").setHeight(h-50);
			} catch (e) {
			}
		}, this, true);
	},
	onQuery : function(){
		if(Ext.getCmp('area').getValue() == '' || Ext.getCmp('factory').getValue() == ''){
			Ext.Msg.alert('','工廠、區域不可空白!');
			return;
		}
		Ext.getCmp('stationKanban').removeAll();
		var queryData = new Object();
		queryData.ST004 = Ext.getCmp('area').getValue();
		queryData.ST005 = Ext.getCmp('factory').getValue();
		Ext.Ajax.request({
			waitMsg: 'Please wait...',
			url : '/eSOP/api/ajax/getStationKanban',
		    method : "POST",
		    params :{
				data : Ext.encode(queryData)
			},
		    success : function (response) {
		    	response = Ext.decode(response.responseText);
		    	if(response.result == 'success'){
		    		for(var i = 0; i < response.record.length; i++){
		    			Ext.getCmp('stationKanban').add(new stationObj({
		    				status : response.record[i].STATUS,
		    				st001 : response.record[i].ST001,
		    				st002 : response.record[i].ST002,
		    				st006 : response.record[i].ST006,
		    				st007 : response.record[i].ST007,
		    				st009 : response.record[i].ST009,
		    				st010 : response.record[i].ST010,
		    			}).create());
		    		}
		    	}else{
		    		Ext.Msg.alert('','查無資料');
		    	}
		    },
		    failure : function (response) {
		    	Ext.Msg.alert('','查詢失敗');
		    }
		});
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
        tbar: ['工廠:', ' ',factoryTriggerField] // 員工代號
    });
    factoryTriggerField.onTriggerClick=function(){
    	sql_fun(factoryTriggerField.getValue(),3);
	}; 
	
	// 在開窗中選擇了資料
	factory_Win_grid.on("celldblclick",function () {
    	var al002=factory_Win_grid.getSelectionModel().selected.first().get("AL002");
    	Ext.getCmp("factory").setValue(al002);
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
        tbar: ['工位區域:', ' ',areaTriggerField] // 員工代號
    });
    areaTriggerField.onTriggerClick=function(){
    	sql_fun(areaTriggerField.getValue(),4);
	}; 
	
	// 在開窗中選擇了資料
	area_Win_grid.on("celldblclick",function () {
    	var al002=area_Win_grid.getSelectionModel().selected.first().get("AL002");
    	Ext.getCmp("area").setValue(al002);
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
//				if (factory_Win_grid!=undefined){
				if(al001 == 3){
					factory_Win_grid.store.removeAll();
					factory_Win_grid.store.loadRawData(response, true);
				}else if(al001 == 4){
					area_Win_grid.store.removeAll();
					area_Win_grid.store.loadRawData(response, true);
				}
					
//				}else{
//					for (var i=0;i<response.ATTRIBUTE_LIST_01.length;i++){
//						if (response.ATTRIBUTE_LIST_01[i].AUTH_ID==userID){
//							userNAME=response.ATTRIBUTE_LIST_01[i].AUTH_NAME;
//							Ext.getCmp("userName").setText(userNAME);
//							reloadData(Ext.getCmp("workDate").getValue(),userID,userNAME);
//						}
//					}
//				}
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