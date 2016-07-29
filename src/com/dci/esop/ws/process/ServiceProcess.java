package com.dci.esop.ws.process;

import java.util.HashMap;
import java.util.Map;

import org.dom4j.DocumentException;

import com.dci.esop.util.Config;
import com.dci.esop.ws.serviceXMLHandle.SFTXMLProcess;
import com.dci.esop.ws.serviceXMLHandle.XMLProcess;

public abstract class ServiceProcess {
	protected Map xmlBaseData = null;
	private String requestXml = "";

	public ServiceProcess(String requestXml) {
		this.requestXml = requestXml;
	}

	abstract public Map executeService();

	public String doService() {
		String IntegrateVer = Config.getInstance().getConfig("Integrate");
		XMLProcess xmlPro = null;
		Map resultMap = new HashMap();
		try {
			if (IntegrateVer.equals("SFT")) {
				xmlPro = new SFTXMLProcess();
			} else if (IntegrateVer.equals("MES")) {
				
			} else if (IntegrateVer.equals("ERP")) {
				
			}
			xmlBaseData = xmlPro.requestXMLDecomposition(requestXml);
			resultMap = executeService();
		} catch (DocumentException e) {
			e.printStackTrace();
			resultMap.put("code", "1");
			resultMap.put("description", "XML parsing failed");
		}
		return xmlPro.responseXMLComposition(resultMap);
	}
}
