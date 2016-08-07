package com.dci.esop.register.data;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import net.sf.json.JSONObject;

import org.codehaus.jettison.json.JSONArray;

import com.dci.esop.register.CryptoManager;
import com.dci.esop.register.crypto.ExecutCodeEncrypt;
import com.dci.esop.register.HardwareEncrypt;
import com.dci.esop.register.crypto.SerialDecrypt;
import com.dci.esop.register.data.SerialData.Syst;
import com.dci.esop.register.util.RegistUtil;

public class RegisterDao {
	
	private static RegisterDao instance = new RegisterDao();
	
	String filename="regist.obj";
	Map<String,RegisterBean> daoMap;
	
	
	
	public static RegisterDao getInstance() {
		return instance;
	}
	
	private RegisterDao(){
		daoMap = new HashMap<String,RegisterBean>();
		read();
	}
	
	private void read(){
		try {
//			System.out.println("RegisterDao.read()");
			if(new File(System.getenv("eSOP_HOME")+"/"+filename).exists()==false) return;
			
			ObjectInputStream in = new ObjectInputStream(new FileInputStream(System.getenv("eSOP_HOME")+"/"+filename));
			daoMap = (Map<String,RegisterBean>) in.readObject();   
			in.close();
//			System.out.println("RegisterDao.read() over"+daoMap.size());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private synchronized void write(){
		try {
			FileOutputStream fos = new FileOutputStream(System.getenv("eSOP_HOME")+"/"+filename);
			ObjectOutputStream out = new ObjectOutputStream(fos); 
			out.writeObject(daoMap); 
			out.flush();
			out.close();
			fos.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void insert(String s){
		RegisterBean rb = new RegisterBean();
		rb.setSerial(s);
		int sysDate = RegistUtil.sysDate2Int();

		/*
		 * 因為不知道何時授權,所以序號驗証通過後,即加上授權失敗日期
		 * 等授權成功時,才將日期清空
		 */
		rb.setFailDate(RegistUtil.int2DateString(sysDate));
		daoMap.put(s, rb);
		write();
	}
	
	public boolean querySerial(String s){
		if(daoMap.get(s)!=null)
			return true;
		
		return false;		
	}
	
	public void update(String serial,String execCode,String failDate){
		RegisterBean rb = daoMap.get(serial);
		rb.setExecCode(execCode);
		rb.setFailDate(failDate);
		initialVerify();
		write();
	}
	
	/*
	 * UI第二個畫面
	 */
	public String getSerialList(){
		JSONArray ja = new JSONArray();
		CryptoManager cm = CryptoManager.getInstance();
		Iterator iter = daoMap.entrySet().iterator(); 
		Date userDate = null;
		Long passDay;
		while (iter.hasNext()) { 
		    Map.Entry entry = (Map.Entry) iter.next(); 
		    String key = (String) entry.getKey(); 
		    RegisterBean val = (RegisterBean) entry.getValue(); 
		    SerialData sd = cm.getSerialInfo(key);
		    //1.執行碼驗證會純在data裡,序號不用重新再驗
		    //2.faildate空值代表驗證序號是OK
		    //3.過期七天的序號不需驗證驗證碼
		    
		    userDate = RegistUtil.int2DataObj(sd.getUseDate());
		    passDay = RegistUtil.passDayCalWithNow(userDate);

			if(!val.getExecCode().isEmpty() && val.getFailDate().isEmpty())
				continue;
			
			//3.過期的序號不需驗證驗證碼
			if(passDay <= 0){
				JSONObject jb = new JSONObject();
				jb.put("terms", key);
				jb.put("value", key);
				ja.put(jb);
			}
		} 

		return ja.toString();
	}
	
	/*
	 * UI第三個畫面
	 */
	public String getSerialInfoDataList(){
		JSONArray ja = new JSONArray();
		CryptoManager cm = CryptoManager.getInstance();
		Iterator iter = daoMap.entrySet().iterator(); 
		Date userDate = null;
		Long passDay;
		int iFailD;
		while (iter.hasNext()) { 
		    Map.Entry entry = (Map.Entry) iter.next(); 
		    String key = (String) entry.getKey(); 
		    RegisterBean val = (RegisterBean) entry.getValue();
		    
		    SerialData sd = cm.getSerialInfo(key);
		    
		    JSONObject jb = new JSONObject();
			jb.put("serialId", RegistUtil.serial2StringFormat(key));
			jb.put("uQty", sd.getUserQty());
			if(sd.getUseDate()>20981231)
				jb.put("userDate","永久");
			else
				jb.put("userDate", RegistUtil.int2DateString(sd.getUseDate()));
			jb.put("serialType",sd.getAreaCode());
			
			if(!val.getExecCode().isEmpty())
				jb.put("isRegExecID", "Y");
			else
				jb.put("isRegExecID", "N");
			
			//1.沒有執行碼
			//2.認證過期failDate會有第一次認證過期日
			if(!val.getExecCode().isEmpty() && val.getFailDate().isEmpty())
				jb.put("isAuth", "Y");
			else
				jb.put("isAuth", "N");
			
//			1. 過期：序號過期		SFTU02_00020
//			2. 授權成功：標準的授權成功		SFTU02_00021
//			3. 授權失敗，試用中：當授權失敗，且目前的日期減去最後授權失敗日期<7天		SFTU02_00022
//			4. 授權失敗，試用過期：當授權失敗，且目前的日期減去最後授權失敗日期>7天		SFTU02_00023
//			5. 無授權，試用中：當無授權，且目前的日期減去最後授權失敗日期<7天		SFTU02_00024
//			6. 無授權，試用過期：當無授權，且目前的日期減去最後授權失敗日期>7天		SFTU02_00025
//			7. 過期，試用中  SFTU02_00026
			
			userDate = RegistUtil.int2DataObj(sd.getUseDate());
		    passDay = RegistUtil.passDayCalWithNow(userDate);
		    //
			if(!val.getExecCode().isEmpty() && val.getFailDate().isEmpty()){
				jb.put("authStates", "授權成功");
			}else if(passDay>=7){
				jb.put("authStates", "過期");
			}else if(passDay>0){
				jb.put("authStates", "過期，試用中");
			}else if(val.getExecCode().isEmpty()){
				iFailD = RegistUtil.string2DataInt(val.getFailDate());
				if(RegistUtil.passDayCalWithNow(iFailD) < 7){
					jb.put("authStates","無授權，試用中");
				}else{
					jb.put("authStates","無授權，試用過期");
				}
			}else{
				iFailD = RegistUtil.string2DataInt(val.getFailDate());
				if(RegistUtil.passDayCalWithNow(iFailD) < 7){
					iFailD = RegistUtil.string2DataInt(val.getFailDate());
					jb.put("authStates", "授權失敗，試用中");
				}else{
					jb.put("authStates", "授權失敗，試用過期");
				}
			}
			ja.put(jb);
		}
		
		return ja.toString();
	}
	
	//取得不同模組使用權
	public boolean getModuleVerify(String[] sy){
		boolean bool=false;
		Iterator iter = daoMap.entrySet().iterator(); 
		SerialDecrypt deSerial=new SerialDecrypt();
		while (iter.hasNext()) { 
		    Map.Entry entry = (Map.Entry) iter.next(); 
		    String key = (String) entry.getKey(); 		
		    RegisterBean val = (RegisterBean) entry.getValue();
		    SerialData sd = deSerial.decrypt(key);
		    if(sd.checkModule(sy) && isPassDay(val,sd)){
		    	bool=true;
		    }
		}
		return bool;
	}
	
	/*
	 * 取得單一不同模組u數
	 * 取得取得合併模組取得u數
	 */
	public int getPassTotalUqtyForModule(String[] sy){
		initialVerify();
		int ipass=0;
		Iterator iter = daoMap.entrySet().iterator(); 
		Date userDate = null;
		Long passDay;
		SerialDecrypt deSerial=new SerialDecrypt();
		while (iter.hasNext()) { 
		    Map.Entry entry = (Map.Entry) iter.next(); 
		    String key = (String) entry.getKey(); 
		    RegisterBean val = (RegisterBean) entry.getValue();
		    
		    SerialData sd = deSerial.decrypt(key);
		    if(sd.checkModule(sy)){
		    	ipass += getPassUqty(val,sd);
//		    	System.out.println("@@@"+ipass);
		    }
		}
		return ipass;
	}
	/*
	 * 取每組序號U數加總
	 */
	public int getPassTotalUqty(){
		initialVerify();
		int ipass=0;
		SerialDecrypt deSerial=new SerialDecrypt();
		
		Iterator iter = daoMap.entrySet().iterator(); 
		while (iter.hasNext()) { 
		    Map.Entry entry = (Map.Entry) iter.next(); 
		    String key = (String) entry.getKey(); 
		    RegisterBean val = (RegisterBean) entry.getValue();
		    
		    SerialData sd =deSerial.decrypt(key);
		    ipass += getPassUqty(val,sd);
		}
		return ipass;
	}
	/*
	 * 1.沒有驗證失敗日期才加
	 * 2.有驗證失敗日期,7天內才加
	 * 3.過期的序號不算U數
	 */
	public int getPassUqty(RegisterBean val,SerialData sd ){
		int ipass=0;
		if(isPassDay(val,sd)){
			ipass =sd.getUserQty();
		}
	    return ipass;
	}
	
	public boolean isPassDay(RegisterBean val,SerialData sd){
		boolean bool=false;
		Date userDate = RegistUtil.int2DataObj(sd.getUseDate());
		Long passDay = RegistUtil.passDayCalWithNow(userDate);
	    if(passDay < 7){
		    if(val.getFailDate().isEmpty()){
		    	bool=true;
		    }else{
		    	int iFailD = RegistUtil.string2DataInt(val.getFailDate());
		    	if(RegistUtil.passDayCalWithNow(iFailD) < 7)
		    		bool=true;
		    }
	    }
		return bool;
	}
	
	/*
	 * 取最小過期天數
	 * -1,表示無需試用,認証成功
	 * >-1,表示有過期天數
	 * 
	 *            
	 * 序號1-------10/1----------------------10/9------------
	 * 序號2------------10/2-----------------10/9------------
	 * return 9-2
	 */
	public int getVerifyFailDay(){
		int iDay=9999;
		SerialDecrypt deSerial=new SerialDecrypt();
		Iterator iter = daoMap.entrySet().iterator(); 
		while (iter.hasNext()) { 
		    Map.Entry entry = (Map.Entry) iter.next(); 
		    String key = (String) entry.getKey(); 
		    RegisterBean val = (RegisterBean) entry.getValue();
		    
		    SerialData sd =deSerial.decrypt(key);
		    
		    //有一組認証成功,就表示沒問題
		    if(val.getFailDate().isEmpty()){
		    	return -1;
		    }

		   	int iFailD = RegistUtil.string2DataInt(val.getFailDate());
//		   	System.out.println(val.getSerial()+":"+val.getFailDate());
		   	//最小過期天數
		   	if(RegistUtil.passDayCalWithNow(iFailD) < iDay)
		   		iDay = (RegistUtil.passDayCalWithNow(iFailD)).intValue();
		}
		
		if(iDay<0)iDay=9999;
		
		return iDay;
	}
	
	
	public void initialVerify(){
		SerialDecrypt deSerial=new SerialDecrypt();
		Iterator iter = daoMap.entrySet().iterator(); 
		while (iter.hasNext()) {
			 Map.Entry entry = (Map.Entry) iter.next(); 
			 String key = (String) entry.getKey(); 
			 RegisterBean val = (RegisterBean) entry.getValue();
			 SerialData sd = deSerial.decrypt(key);
			 
			 int sysDate = RegistUtil.sysDate2Int();
			 
			 /*
			  * 沒有執行碼,無授權
			  * 驗證執行碼是否正確
			  * 驗證日期是否過期
			  */
			 if(val.getExecCode().isEmpty() ||
				!verifyExecuteCode(key, val.getExecCode()) ||
				sd.getUseDate() < sysDate
			 ){
				 /*
				  * val.setFailDate只記錄第一次驗證失敗日期,這樣才有依據算過期七天
				  * 重新認證過後,此欄位是空
				  */
				 if(val.getFailDate().isEmpty()){
					 val.setFailDate(RegistUtil.int2DateString(sd.getUseDate(),1));
				 }
			 }else{
				 val.setFailDate("");
			 }
		}
	}

	public boolean verifyExecuteCode(String serial,String verifyCode){
		boolean isOK=false;
		HardwareEncrypt enHardware=HardwareEncrypt.getInstance();
		ExecutCodeEncrypt enExeCode = new ExecutCodeEncrypt();
		String hardwardCode="";
		try {
			hardwardCode = enHardware.encrypt();
		}  catch (IOException e) {
			e.printStackTrace();
		}
		//當最後取不到機碼時，取隨機字串當機碼，以利後續判斷
		if(hardwardCode.trim().equals("")){
			hardwardCode = enHardware.getFakeHardCode();
		}
		String hardware = hardwardCode;
		String execCode = enExeCode.encrypt(serial,hardware);
		if(execCode.equals(verifyCode)){
			isOK=true;
		}
		
		return isOK;
	}
	
	public static void main(String[] args) throws Exception {
		RegisterDao rsd = new RegisterDao();
//		rsd.insert("GZI0KNV07HQ3T0J9G3LWCG37WSBWIC");
//		rsd.insert("DZI0IME07HQ3AYBO728GYGXQIFAVZV");
//		rsd.insert("JZI0YR607HQ31A95A7LM8G446TRCP5");
//		System.out.println(rsd.getPassTotalUqty());
//		System.out.println(rsd.getVerifyFailDay());

//		String[] sy={"SFT","TABLETPC"};
		String[] sy={"HMI"};
		System.out.println("getModuleVerify:"+rsd.getModuleVerify(sy));
		System.out.println("getPassTotalUqtyForModule:"+rsd.getPassTotalUqtyForModule(sy));
	}
	
	/**
	 * 取得系統授權頁面可使用模組GRID
	 * @param sy 傳入授權模組代號
	 * @return
	 */
	public String getMoudleInfo(String[] sy){
		JSONArray ja = new JSONArray();
		CryptoManager cm = CryptoManager.getInstance();
		for(String v : sy) {
			JSONObject jb = new JSONObject();
			Integer LastDay=19110101;
			String [] type={v};
			boolean check=getModuleVerify(type);
			if(v.equals("ESOP")){
				jb.put("type","ESOP");
			}else if(v.equals("TABLETPC")){
				jb.put("type","平板");
			}else if(v.equals("ENG")){
				jb.put("type","英文版");
			}else if(v.equals("VIET")){
				jb.put("type","越南文版");
			}
			
			if(check){
				jb.put("canuse","Y");
			}else{
				jb.put("canuse","N");
			}
			
			Iterator iter = daoMap.entrySet().iterator(); 
			
			if(check){
				while (iter.hasNext()) { 
				    Map.Entry entry = (Map.Entry) iter.next(); 
				    String key = (String) entry.getKey(); 
				    RegisterBean val = (RegisterBean) entry.getValue();
				    SerialData sd = cm.getSerialInfo(key);
				    //確定此序號是否有模組權限
				    boolean canuse=sd.checkModule(type);
				    if(sd.getUseDate()>LastDay && canuse){
				    	LastDay=sd.getUseDate();
				    }
				}
			}
			if(LastDay>20981231)
				jb.put("deadline","永久");
			else
				jb.put("deadline", RegistUtil.int2DateString(LastDay));
			ja.put(jb);
		}
		return ja.toString();
	}
}
