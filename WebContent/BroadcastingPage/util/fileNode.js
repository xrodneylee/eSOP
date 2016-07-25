/**
 * 
 */
function fileObj(parameter){
		this.ss003 = parameter.ss003;
		this.ss004 = parameter.ss004;
		this.ss005 = parameter.ss005;
		this.ss006 = parameter.ss006;
		this.ss007 = parameter.ss007;
		this.ss008 = parameter.ss008;

		this.create = function(){
			return Ext.create('Ext.panel.Panel',{
				title : this.ss003,
				titleAlign : 'center',
				frame : true,
				width : 150,
				height : 180,
				margin : '5 0 0 5',
				html : "<img onclick=\"parent.onloadPDF('"+(this.ss003)+"','"+(this.ss004)+"','"+(this.ss005)+"','"+(this.ss006)+"','"+(this.ss007)+"','"+(this.ss008)+"')\" src='/eSOP/StationKanban/ImageLoader.jsp?fileName="+(this.ss005).replace('.pdf','.jpg')+"' width='140px' height='170px' border='0'/>"
			});
		}
}
