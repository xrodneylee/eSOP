package com.dci.esop.register.crypto;

import java.math.BigInteger;
import java.util.Random;

import com.dci.esop.register.data.SerialData;
import com.dci.esop.register.util.RegistUtil;

public class SerialEncrypt extends CryptoSerial{
	SerialData sd;
	
	public SerialEncrypt(){
		super();
	}
	
	public SerialEncrypt(SerialData sd){
		super();
		this.sd = sd;
	}
	
	public String encrypt(SerialData sd) {
		this.sd=sd;
		execute();
		return RegistUtil.ArraysToString(cryptoResult);
	}

	public String encrypt() {
		if(sd==null) return "";
		return RegistUtil.ArraysToString(cryptoResult);
	} 
	
	private void execute(){
		cryptoDate2String(sd.getUseDate());
		cryptoUserQty2String(sd.getUserQty());
		cryptoArea2String(sd.getAreaCode());
		cryptoSerialNum2String(sd.getSerialNum());
		cryptoModuleId2String(sd.getModuleId());
		cryptoOther2String();
		cryptoVerifyId2String();
	}

	//日期 1、7、13、17、21 , 28
	private void cryptoDate2String(int d){
		Random rand = new Random();
		int rx = rand.nextInt(radixs.length);
		String str = RegistUtil.parseNum2String(d,radixs[rx]);
		str+=radixsText[rx];
		int[] point={0,6,12,16,20,27};
		setResultValue(point,RegistUtil.string2Array(str));
	}
	
	//人數,放至第4、22
	private void cryptoUserQty2String(int u){
		String result = RegistUtil.parseNum2String(u,36); 
		result=RegistUtil.leftPad(result,3,'0');
		int[] point={3,21,22};
		setResultValue(point,RegistUtil.string2Array(result));
	}
		
	//區別碼,放至第18位
	private void cryptoArea2String(String str){
		cryptoResult[17] = getRandomByte(RegistUtil.string2Array(str));
	}
	
	//流水號0000001~ 1679615,放至8、9、11、12
	private void cryptoSerialNum2String(String str){
		String _serialNum = RegistUtil.parseNum2String(Integer.valueOf(str),36);
		_serialNum=RegistUtil.leftPad(_serialNum,4,'0');
		int[] point={7,8,10,11};
		setResultValue(point,RegistUtil.string2Array(_serialNum));
	}
	
	//將模組代碼62位數字串資料2進制轉成36進制的12位數字串資料，若不滿12位，使用0往前補齊，
	//並使用36位進制加法加上以17、18、22、28組合的4位數，依字串順序放至2、3、6、10、14、15、19、20、25、26、27、29位
	private void cryptoModuleId2String(String id){
		BigInteger iNum2to10 = RegistUtil.parseString2BigInteger(id,2);

		int[] point={16,17,21,27};
		String radixText36 = getResultValue(point);
		BigInteger iNum36to10 = RegistUtil.parseString2BigInteger(radixText36,36);

		BigInteger iSum = iNum2to10.add(iNum36to10);
		String _module = RegistUtil.parseBigInteger2String(iSum,36);
		_module=RegistUtil.leftPad(_module,12,'0');

		int[] point2 = {1,2,5,9,13,14,18,19,24,25,26,28};
		setResultValue(point2,RegistUtil.string2Array(_module));
	}
	
	//5、16、24隨機產生0~Z的36位進制文字放進去。
	private void cryptoOther2String(){
		int[] point = {4,15,23};
		for(int i=0;i<point.length;i++){
			cryptoResult[point[i]] = getRandomByte(RegistUtil.string2Array("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
		}
	}
	
	private void cryptoVerifyId2String(){
		cryptoResult[29] = getVerifyId();
	}
	
	private <T> T getRandomByte(T[] t){
		Random rand = new Random();
		int iR = rand.nextInt(t.length);
		return t[iR];	
	}

}
