package com.dci.esop.register.crypto;

import org.apache.commons.codec.binary.Base64;

import com.dci.esop.register.util.RegistUtil;
 
public class ExecutCodeEncrypt {
	String[] serial;
	String[] hardware;
	
	int[] p1 = {0,1,2,3,4,5,6,7,8,9};
	int[] p2 = {10,11,12,13,14,15,16,17,18,19};
	int[] p3 = {20,21,22,23,24,25,26,27,28,29};
	
	public ExecutCodeEncrypt(){}
	
	public ExecutCodeEncrypt(String serial ,String hardware){
		this.serial=RegistUtil.string2Array(serial);
		this.hardware=RegistUtil.string2Array(hardware);
	}
	
	public String encrypt(String serial ,String hardware) {
		this.serial=RegistUtil.string2Array(serial);
		this.hardware=RegistUtil.string2Array(hardware);
		return execute();
	}

	public String encrypt() { 
		if(serial==null || hardware==null) return "";
		return execute();
	}
	
	private String execute(){
		String res = getResultValue(p1,p2);
		
		res += getResultValue(p2,p3);
		
		res += getResultValue(p3,p1);
		byte[] encoded = Base64.encodeBase64(res.getBytes());   
		return new String(encoded);
	}
	
	//第1~10與機碼的11~20每一字元獨立對應進行36進位加總，不考慮進位
	//第11~20與機碼的21~30每一字元獨立對應進行36進位加總，不考慮進位
	//第21~10與機碼的1~10每一字元獨立對應進行36進位加總，不考慮進位
	protected  String getResultValue(int[] p1,int[] p2){
		String res="";
		for(int i=0;i<p1.length;i++){
			String serial_byte = serial[p1[i]];
			String hardware_byte = hardware[p2[i]];
			
			int p1_value_10 = RegistUtil.parseString2Num(serial_byte,36);
			int p2_value_10 = RegistUtil.parseString2Num(hardware_byte,36);
			
			int iSum10 = p1_value_10 + p2_value_10;
			
			String sSum36 = RegistUtil.parseNum2String(iSum10, 36); 
			
			String[] sSum36s = RegistUtil.string2Array(sSum36);
			res += sSum36s[sSum36s.length-1]; 
		}
//		System.out.println(res+"         "+res.substring(1, 8));
		return res.substring(1, 9);
	}
}
