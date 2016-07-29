/**
 * 
 */
Ext.define('ConfigEdit.store.crossSetting', {
	extend : 'Ext.data.Store',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/eSOP/api/ajax/getConfigData/99',
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
            store.load();
        }
    },
	model : 'ConfigEdit.model.crossSetting'
});