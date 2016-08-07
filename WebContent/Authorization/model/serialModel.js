/**
 * 
 */
Ext.define('Authorization.model.serialModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'serialId',
		type : 'string'
	}, {
		name : 'uQty',
		type : 'string'
	}, {
		name : 'userDate',
		type : 'string'
	}, {
		name : 'serialType',
		type : 'string'
	}, {
		name : 'isRegExecID',
		type : 'string'
	}, {
		name : 'isAuth',
		type : 'string'
	}, {
		name : 'authStates',
		type : 'string'
	}]
});