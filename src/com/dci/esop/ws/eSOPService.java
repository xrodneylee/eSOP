package com.dci.esop.ws;

import com.dci.esop.authentication.UserCheck;
import com.dci.esop.ws.process.Service_sop_display_process;
import com.dci.esop.ws.process.Service_sop_get;
import com.dci.esop.ws.process.Service_station_get;

public class eSOPService {
	
	//顯示作業指導書
	public String sop_display_process(String requestXml){
		System.out.println(requestXml);
		Service_sop_display_process serviceProcess = new Service_sop_display_process(requestXml);
		String result = serviceProcess.doService();
		System.out.println(result);
		return result;
	}
	
	//取得工位清單
	public String station_get(String requestXml){
		System.out.println(requestXml);
		Service_station_get serviceProcess = new Service_station_get(requestXml);
		String result = serviceProcess.doService();
		System.out.println(result);
		return result;
	}
	
	//回傳sop清單
	public String sop_get(String requestXml){
		System.out.println(requestXml);
		Service_sop_get serviceProcess = new Service_sop_get(requestXml);
		String result = serviceProcess.doService();
		System.out.println(result);
		return result;
	}
	
	//回傳異質系統是否可使用eSOP
	public String canUseESOP(){
		UserCheck UserCheck = new UserCheck();
		String result = "N";
		if(UserCheck.getOnlineMaxUser() > 0){
			result = "Y";
		}
		return result;
	}
	
}
