package com.dci.esop.register.data;

import com.dci.esop.register.util.RegistUtil;

public class SerialData {
	private int useDate;
	private int userQty;
	private String moduleId;
	private String serialNum;
	private String areaCode;

	public enum Area {
		NUMBER("0123456789"), CHARACTER("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
		private Area(String value){this.value = value;}
		private String value;
		public String toString(){return value;}
	}
	
	public enum Syst {
		SFT(0),TABLETPC(1),TRC(2),SPC(3),HMI(4),EQM(5),ENG(6),VIET(7),SFTKB(8),FMS(9),ESOP(10),ALM(11),RFID(12);
		private Syst(int value){this.value = value;}
		private int value;
		public int getValue(){return value;}
	}
	
	static public String getAreaValue(String key){
		for(Area c : Area.values()) {
			String[] tmp = RegistUtil.string2Array(c.toString());
			if(RegistUtil.ArraysSearch(tmp, key) > -1)
				return c.toString();
		}
		return "";
	}
	static public int getSystValue(String key){
		for(Syst c : Syst.values()) {
			String nam=c.name();
			if(nam.equals(key))
				return c.getValue();
		}
		return -1;
	}
	
	public int getUseDate() {
		return useDate;
	}
	public void setUseDate(int useDate) {
		this.useDate = useDate;
	}
	public int getUserQty() {
		return userQty;
	}
	public void setUserQty(int userQty) {
		this.userQty = userQty;
	}
	public String getModuleId() {
		return moduleId;
	}
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	public String getSerialNum() {
		return serialNum;
	}
	public void setSerialNum(String serialNum) {
		this.serialNum = serialNum;
	}
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}	
	
	public String toString(){
		return
		"日期:"+useDate+
		"\n U數:"+userQty+
		"\n 流水號:"+serialNum+
		"\n 區別碼:"+areaCode+
		"\n 模組代碼:"+moduleId;
	}
	/*
	 * 取得模組是否有權限
	 * String[] sy 模組代號
	 * moduleId 序號裡模組代碼
	 */
	public boolean checkModule(String[] sy){
		boolean bool=false;
		String[] m=RegistUtil.string2Array(moduleId);
		for(String v : sy) {
			if(m[getSystValue(v)].equals("1")){
				bool=true;
				break;
			}
		}
		return bool;
	}
	
	public static void main(String[] args) throws Exception {
//		SerialData sd=new SerialData();
//		sd.setModuleId("11111111111111111111011111111111111111111111111111111111111111");
		String module="11111111111111111111011111111111111111111111111111111111111111";
		String[] ss=RegistUtil.string2Array(module);
		System.out.println(ss[SerialData.Syst.SFT.getValue()]);
		
		System.out.println(getSystValue("ENG"));
	}

}
