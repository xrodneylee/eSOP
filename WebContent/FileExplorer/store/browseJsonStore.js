Ext.define('FileExplorer.store.browseJsonStore', {
	id:'browseJsonStore',
	extend : 'Ext.data.Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'eSOP'
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
	model : 'FileExplorer.model.browseModel'
});