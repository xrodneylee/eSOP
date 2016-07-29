package com.dci.esop.ws.serviceXMLHandle;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

public class SFTXMLProcess extends XMLProcess {

	public Map requestXMLDecomposition(String xml) throws DocumentException {
		Map baseData = new HashMap();
		JSONObject RequestContent = new JSONObject();
		Document document = null;
		document = DocumentHelper.parseText(xml);
		Element xmlElement = (Element) document.selectSingleNode("/request/host");
		baseData.put("CREATER", xmlElement.attributeValue("acct"));
		xmlElement = (Element) document.selectSingleNode("/request/payload/param/data_request/datainfo/parameter");
		baseData.put("service", xmlElement.attributeValue("key"));
		xmlElement = (Element) document.selectSingleNode("/request/payload/param/data_request/datainfo/parameter/data");
		Iterator it = document.selectNodes("/request/payload/param/data_request/datainfo/parameter/data").iterator();
		while (it.hasNext()) {
			Element ele = (Element) it.next();
		}
		baseData.put("data", xmlElement);
		return baseData;
	}

	public String responseXMLComposition(Map resultMap) {
		Document document = DocumentHelper.createDocument();
		Element rootElement = document.addElement("response");
		Element reqidElement = rootElement.addElement("reqid");
		reqidElement.addText("3175562140567422664467");
		Element srvverElement = rootElement.addElement("srvver");
		srvverElement.addText("1.0");
		Element srvcodeElement = rootElement.addElement("srvcode");
		srvcodeElement.addText("000");
		Element payloadElement = rootElement.addElement("payload");
		Element paramElement = payloadElement.addElement("param");
		paramElement.addAttribute("key", "std_data");
		paramElement.addAttribute("type", "xml");
		Element data_responseElement = paramElement.addElement("data_response");
		Element executionElement = data_responseElement.addElement("execution");
		Element statusElement = executionElement.addElement("status");
		statusElement.addAttribute("code", resultMap.get("code").toString());
		statusElement.addAttribute("description", resultMap.get("description").toString());
		
		Element rowElement = null,fieldElement = null;
		
		if(resultMap.containsKey("responseData")){
			List responseData = (List)resultMap.get("responseData");
			Element datainfoElement = data_responseElement.addElement("datainfo");
			Element parameterElement = datainfoElement.addElement("parameter");
			parameterElement.addAttribute("key", resultMap.get("service").toString());
			parameterElement.addAttribute("type", "data");
			Element dataElement = parameterElement.addElement("data");
			dataElement.addAttribute("name", resultMap.get("service").toString());
			for(int i = 0; i < responseData.size(); i++){
				Map record = (Map)responseData.get(i);
				rowElement = dataElement.addElement("row");
				rowElement.addAttribute("seq", String.valueOf((i+1)));
				for(Object key : record.keySet()){
					fieldElement = rowElement.addElement("field");
					fieldElement.addAttribute("name", key.toString());
					fieldElement.addAttribute("type", "string");
					fieldElement.addText(record.get(key).toString());
				}
			}
		}
		
		return document.asXML();
	}

}
