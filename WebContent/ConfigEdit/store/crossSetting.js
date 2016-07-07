/**
 * 
 */
Ext.define('ConfigEdit.store.crossSetting', {
	id:'crossSettingStore',
	extend : 'Ext.data.Store',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/eSOP/api/ajax/getConfigData',
        reader: {
            type: 'json',
            root: 'CONFIG'
        },
        writer: {
            type: 'json'
        },
        afterRequest:function(request,success){
            var operation = request.operation;
            var response = operation.response; 
            if(success){
            }else{}
        }
    },
    listeners: {
        // 讀取完資料後，進行 load 
        write: function(store, operation) {
        	alert()
            store.load();
        }
    },
	model : 'ConfigEdit.model.crossSetting'
});