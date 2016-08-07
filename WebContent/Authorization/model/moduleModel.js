/**
 * 
 */
Ext.define('Authorization.model.moduleModel', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'type',
		type : 'string'
	}, {
		name : 'canuse',
		type : 'string'
	}, {
		name : 'deadline',
		type : 'string'
	} ]
});