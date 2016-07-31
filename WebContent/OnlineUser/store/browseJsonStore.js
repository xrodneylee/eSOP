Ext.define('OnlineUser.store.browseJsonStore', {
	id:'browseJsonStore',
	extend : 'Ext.data.Store',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/eSOP/api/ajax/getONLINE_USER_RECORD',
        reader: {
            type: 'json',
            root: 'ONLINE_USER_RECORD'
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
	model : 'OnlineUser.model.browseModel'
});