/**
 * 
 */
function stationObj(parameter){
		this.status = parameter.status;
		this.st001 = parameter.st001;
		this.st002 = parameter.st002;
		this.st006 = parameter.st006;
		this.st007 = parameter.st007;
		this.st009 = parameter.st009;
		this.st010 = parameter.st010;
		this.sp003 = parameter.sp003;

		this.create = function(){
			return Ext.create('Ext.panel.Panel',{
				frame : true,
				width : 100,
				height : 180,
				title : this.st002,
				titleAlign : 'center',
				margin : '0 0 0 3',
				items : [{
					xtype : 'textfield',
					width : 90,
					readOnly : true,
					value : this.status,
					fieldStyle : 'text-align:center;background : '+((this.st006 == 'N')?"gray;":((this.st007 == 'Y')?"green;":"red;"))
				},{
					xtype : 'panel',
					width : 90,
					height : 100,
					html : "<a href='/eSOP/stationKanban/PDFLoader.jsp?fileName="+this.sp003+"' target='_blank'><img src='/eSOP/stationKanban/ImageLoader.jsp?fileName="+(this.sp003).split(".")[0]+".jpg' width='90px' height='100px' border='0'></a>"
				},{
					xtype : 'label',
					width : 100,
					text : this.st009 + ' ' + this.st010 + '版',
				}]
			});
	}
}