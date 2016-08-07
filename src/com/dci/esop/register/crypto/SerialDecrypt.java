package com.dci.esop.register.crypto;

import java.math.BigInteger;

import com.dci.esop.register.data.SerialData;
import com.dci.esop.register.util.RegistUtil;

public class SerialDecrypt extends CryptoSerial{
	
	public SerialDecrypt(){
		super();
	}
	
	public SerialDecrypt(String deStr){
		super(deStr);
	}
	
	public SerialData decrypt() {		 
		return execute();
	}
	
	public SerialData decrypt(String deStr) {
		deStr.replaceAll("-", "");
		cryptoResult = RegistUtil.string2Array(deStr);
		return execute();
	}
	
	private SerialData execute(){
		SerialData sd = new SerialData();
		sd.setUseDate(cryptoString2Date());
		sd.setUserQty(cryptoString2UserQty());
		sd.setAreaCode(cryptoString2Area());
		sd.setSerialNum(cryptoStringSerialNum());
		sd.setModuleId(cryptoString2ModuleId());
		 
		return sd;
	}
	
	//{0,6,12,16,20,27}
	private int cryptoString2Date(){
		int[] point={0,6,12,16,20};
		String radixText36 = getResultValue(point);
		return RegistUtil.parseString2Num(radixText36,searchRadixsText());
	}
	
	//{3,21}
	private int cryptoString2UserQty(){
		int[] point={3,21,22};
		String radixText36 = getResultValue(point);
		return RegistUtil.parseString2Num(radixText36,36);
	}
	
	//區別碼,放至第18位
	private String cryptoString2Area(){
		return SerialData.getAreaValue(cryptoResult[17]);
	}
	
	//{7,8,10,11}
	private String cryptoStringSerialNum(){
		int[] point={7,8,10,11};
		String radixText36 = getResultValue(point);
		int tmp = RegistUtil.parseString2Num(radixText36,36);
		return String.format("%07d",tmp);
	}
	
	private String cryptoString2ModuleId(){
		int[] point = {1,2,5,9,13,14,18,19,24,25,26,28};
		String radixText36 = getResultValue(point);
		BigInteger iNum36to10_ID = RegistUtil.parseString2BigInteger(radixText36,36);
		
		int[] point2={16,17,21,27};
		String radixText362 = getResultValue(point2);
		BigInteger iNum36to10 = RegistUtil.parseString2BigInteger(radixText362,36);
		
		BigInteger itmp = iNum36to10_ID.subtract(iNum36to10);
	
		String tmpModuleString = RegistUtil.parseBigInteger2String(itmp,2);
//		tmpModuleString = ("0000000000" +
//					"0000000000" +
//					"0000000000" +
//					"000000").substring(0, 36 - tmpModuleString.length()) + tmpModuleString;
		return RegistUtil.leftPad(tmpModuleString,62,'0');
	}
	
	public boolean verifySerialCode(String deStr)throws Exception{
		cryptoResult = RegistUtil.string2Array(deStr);
		String code = getVerifyId();
		if(!code.equals(cryptoResult[cryptoResult.length-1])){
			throw new Exception("SFTU02_00033");//SFTI27_00033 序號錯誤
		}

		SerialData sd = decrypt(deStr);
		if(sd.getAreaCode().trim().equals("0123456789")&&(sd.getUseDate()>20981231)){
			throw new Exception("SFTU02_00034");//SFTI27_00034 借貨序號使用期限錯誤
		}

		return true;
	}
}
