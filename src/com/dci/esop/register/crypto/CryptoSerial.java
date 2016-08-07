package com.dci.esop.register.crypto;

import com.dci.esop.register.util.RegistUtil;

public class CryptoSerial {
	String[] cryptoResult;
	
	Integer[] radixs = {30,31,32,33,34,35,36};
	String[] radixsText = RegistUtil.string2Array("QSCWDVA");
	
	public CryptoSerial(){
		this(null);
	}
	 
	public CryptoSerial(String deStr){
		if(deStr!=null && deStr.length()==30){
			cryptoResult = RegistUtil.string2Array(deStr);
		}else{
			cryptoResult=new String[30];
		}
	}
	
	public int searchRadixsText(){
		String key = cryptoResult[27];
		return radixs[RegistUtil.ArraysSearch(radixsText, key)];
	}
	
	protected  String getResultValue(int[] point){
		String res="";
		for(int i=0;i<point.length;i++){
			res += cryptoResult[point[i]];
		}
		return res;
	}
	
	protected String getVerifyId(){
		int iSum10=0;
		for(int i=0;i<cryptoResult.length-1;i++){
			int iValue10=RegistUtil.parseString2Num(cryptoResult[i],36);   //36 to 10
			
			if(i==1 || i==10 || i==23){
				iSum10 -= iValue10;
			}else{
				iSum10 += iValue10;
			}
		}
		
		
		String sSum36 = RegistUtil.parseNum2String(iSum10, 36);    
		String[] sSum36s = RegistUtil.string2Array(sSum36);
		return sSum36s[sSum36s.length-1];
	}
	
	protected  void setResultValue(int[] point,String[] strs){
		for(int i=0;i<point.length;i++){
			cryptoResult[point[i]] = strs[i];
		}
	}
	
	
}
