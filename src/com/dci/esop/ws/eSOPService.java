package com.dci.esop.ws;

import com.dci.esop.util.Config;
import com.dci.esop.ws.process.Service_sop_display_process;
import com.dci.esop.ws.serviceXMLHandle.SFTXMLProcess;
import com.dci.esop.ws.serviceXMLHandle.XMLProcess;

public class eSOPService {
	
	//顯示作業指導書
	public String sop_display_process(String requestXml){
		Service_sop_display_process serviceProcess = new Service_sop_display_process(requestXml);
		String result = serviceProcess.doService();
		return result;
	}
	
}
