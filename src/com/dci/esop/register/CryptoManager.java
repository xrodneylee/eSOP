package com.dci.esop.register;

import java.io.IOException;
import java.net.UnknownHostException;

import com.dci.esop.register.crypto.ExecutCodeEncrypt;
import com.dci.esop.register.HardwareEncrypt;
import com.dci.esop.register.crypto.SerialDecrypt;
import com.dci.esop.register.crypto.SerialEncrypt;
import com.dci.esop.register.data.RegisterDao;
import com.dci.esop.register.data.SerialData;

public class CryptoManager {
	
	private static CryptoManager instance = new CryptoManager();
	SerialEncrypt enSerial;
	SerialDecrypt deSerial;
	ExecutCodeEncrypt enExeCode;
	HardwareEncrypt enHardware;
	RegisterDao dao;

	private CryptoManager(){
		initial();
	}
	 
	public static CryptoManager getInstance() {
		return instance;
	}
	
	private void initial(){
		enSerial = new SerialEncrypt();
		deSerial = new SerialDecrypt();
		enExeCode = new ExecutCodeEncrypt();
		enHardware = HardwareEncrypt.getInstance();
		dao = RegisterDao.getInstance();
		initialVerify();
	}
	
	//序號解碼
	public SerialData getSerialInfo(String serial){
		return deSerial.decrypt(serial);
	}
	
	//取合格U數
	public int getPassTotalUqty(){
		return dao.getPassTotalUqty();
	}
	
	/*
	 * 取得單一不同模組u數
	 * 取得合併模組取得u數
	 */
	public int getPassTotalUqtyForModule(String[] str){
		return dao.getPassTotalUqtyForModule(str);
	}
	/*
	 * 取SFT total u數
	 */
	public int getPassTotalUqtyForSFTModule(){
		String[] _u={"SFT","TABLETPC","TRC","ENG","VIET","FMS","ESOP","ALM","RFID"};
		return getPassTotalUqtyForModule(_u);
	}
	/*
	 * 人機u數
	 */
	public int getPassTotalUqtyForHMIModule(){
		String[] _u={"HMI"};
		return getPassTotalUqtyForModule(_u);
	}
	/*
	 * SFT內含看板U數
	 */
	public int getPassTotalUqtyForSFTKBModule(){
		String[] _u={"SFTKB"};
		return getPassTotalUqtyForModule(_u);
	}
	//取得不同模組使用權
	public boolean getModuleVerify(String[] str){
		return dao.getModuleVerify(str);
	}	
	
	//取最大試用天數
	public int getVerifyFailDay(){
		return dao.getVerifyFailDay();
	}
	
	
	/*
	 * 取得執行碼
	 * 序號,機碼
	 */
	public String getExecuteCode(String serial,String hardware){
		return enExeCode.encrypt(serial,hardware);
	}
	
	//硬體資訊
	public String getHardwareCode(){
		String s="";
		try {
			s = enHardware.encrypt();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return s;
	}

	/*
	 * 驗證序號
	 */
	public String verifySerial(String serial){
		String msg="";
		try {
			serial=serial.replaceAll("-", "");
			boolean bool=deSerial.verifySerialCode(serial);
			if(dao.querySerial(serial)==true)
				return "此序號己新增";//SFTU02_00014=此序號己新增
			try {
				dao.insert(serial);
				msg="儲存完成";//SFTU02_00032	儲存完成
			} catch (Exception e) {
				msg="儲存失敗";//SFTU02_00012=儲存失敗
				e.printStackTrace();
			}
			
		} catch (Exception e) {
			msg=e.getMessage();//SFTU02_00012=儲存失敗
			e.printStackTrace();
		}
		return msg;
	}
	
	/*
	 * 驗證執行碼
	 */
	public String verifyExecuteCode(String serial ,String hardware,String verifyCode){
		String msg="";
		String execCode = getExecuteCode(serial,hardware);
		if(execCode.equals(verifyCode)){
			dao.update(serial,verifyCode,"");
			msg="儲存完成";//JS_0092_00010	儲存完成
		}
		else{
			msg="執行碼錯誤";//SFTU02_00013=執行碼錯誤
		}
		return msg;
	}
	
	public boolean verifyExecuteCode(String serial,String verifyCode){
		return dao.verifyExecuteCode(serial, verifyCode);
	}
	
	/*
	 * 取得未驗證過執行碼的序號,或驗證錯誤的序號
	 */
	public String getSerialList(){
		return dao.getSerialList();
	}
	
	/*
	 * 取得每組序號資訊
	 */
	public String getSerialInfoDataList(){
		return dao.getSerialInfoDataList();
	}
	
	public void initialVerify(){
		dao.initialVerify();
	}
	
	/*
	 * 取得可使用模組
	 */
	
	public String getMoudleInfo(){
		String[] _u={"ESOP","TABLETPC","ENG","VIET"};
		return dao.getMoudleInfo(_u);
	}
}
