/**
 * 
 */
Ext.define('spotRegister.controller.spotRegisterControl', {
	extend : 'Ext.app.Controller',
	views : [],
	stores : [],
	models : [],
	init : function(application) {
		this.control({
			'#check' : {
				click : this.onClick
			}
		});
	},
	onClick : function(){
		
	}
});