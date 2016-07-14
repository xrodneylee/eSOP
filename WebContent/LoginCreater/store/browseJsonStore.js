Ext.define('LoginCreater.store.browseJsonStore', {
	id:'browseJsonStore',
	extend : 'Ext.data.Store',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/eSOP/api/ajax/getPRINCIPAL',
        reader: {
            type: 'json',
            root: 'PRINCIPAL'
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
	model : 'LoginCreater.model.browseModel'
});