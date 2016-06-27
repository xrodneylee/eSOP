/**
 * eSOP登入頁面
 */


Ext.onReady(function(){
//	var viewport = new Ext.Viewport({
//        layout: 'border',
//        items: []
//    });
	      var form1=Ext.create("Ext.form.Panel", {
	                frame: true,
	                width: 340,
	                bodyPadding: 5,
	                buttonAlign: "right",
	                fieldDefaults: {
	                  labelAlign: "left",
	                  labelWidth: 50,
	                  anchor: "100%"
	                  },
	                items: [
	                  {xtype: "textfield",
	                   name: "account",
	                   fieldLabel: "帳號 ",
	                   allowBlank: false},
	                  {xtype: "textfield",
	                   name: "password",
	                   inputType: "password",
	                   fieldLabel: "密碼 ",
	                   allowBlank: false}
	                  ],
	                buttons: [{
	                  text: "登入",
	                  formBind: true,
	                  disabled: true,
	                  handler: function(){
	                    var form=this.up("form").getForm();
	                    var values=form.getValues();
	                    var msg="帳號:" + values["account"] + "<br>" +
	                            "密碼:" + values["password"];
	                    Ext.Msg.alert("訊息",msg);
	                    }
	                  }]
	                });
	      Ext.create("Ext.window.Window", {
	                 title: "登入",
	                 height: 150,
	                 width: 300,
	                 layout: "fit",
	                 items: [form1]
	                 }).show();   
});