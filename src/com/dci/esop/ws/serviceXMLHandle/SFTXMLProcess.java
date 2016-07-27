package com.dci.esop.ws.serviceXMLHandle;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import net.sf.json.xml.XMLSerializer;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class SFTXMLProcess extends XMLProcess {

	public Map requestXMLDecomposition(String xml) throws DocumentException {
		Map baseData = new HashMap();
		JSONObject RequestContent = new JSONObject();
		SAXReader reader = new SAXReader();
		Document document = null;
		document = DocumentHelper.parseText(xml);
		Element xmlElement = (Element) document.selectSingleNode("/Request/Access/Authentication");
		baseData.put("user", xmlElement.attributeValue("user"));
		baseData.put("password", xmlElement.attributeValue("password"));
		xmlElement = (Element) document.selectSingleNode("/Request/Access/Connection");
		baseData.put("application", xmlElement.attributeValue("application"));
		baseData.put("source", xmlElement.attributeValue("source"));
		xmlElement = (Element) document.selectSingleNode("/Request/Access/COMPANY");
		baseData.put("COMPANY", xmlElement.attributeValue("name"));
		xmlElement = (Element) document.selectSingleNode("/Request/Access/Locale");
		baseData.put("language", xmlElement.attributeValue("language"));
		xmlElement = (Element) document.selectSingleNode("/Request/RequestContent");
		Iterator it = document.selectNodes("/Request/RequestContent").iterator();
		while (it.hasNext()) {
			Element ele = (Element) it.next();
		}

		baseData.put("RequestContent", xmlElement);
		return baseData;
	}

	public String responseXMLComposition(Map resultMap) {
		Document document = DocumentHelper.createDocument();
		Element rootElement = document.addElement("Response");
		Element executionElement = rootElement.addElement("Execution");
		Element statusElement = executionElement.addElement("Status");
		statusElement.addAttribute("code", resultMap.get("code").toString());
		statusElement.addAttribute("description", resultMap.get("description").toString());
		
		//堆栈信息不为空的作为WIP代码异常，平台将抛出异常，将堆栈信息为空的作为业务异常，在返回值中返回。
		Element stacktraceElement = executionElement.addElement("Stacktrace");

		
		
		Element responseContentElement = null;
		Element parameterElement = null;
		Element recordElement = null;
		Element fieldElement = null;
		// 回傳單身訊息

		if (resultMap.get("resultDataArr") != null) {
			JSONArray resultDataArr = (JSONArray) resultMap.get("resultDataArr");
			if (resultDataArr.size() > 0) {
				responseContentElement = rootElement.addElement("ResponseContent");
				parameterElement = responseContentElement.addElement("Parameter");
				for (int RecordSetCounter = 0; RecordSetCounter < resultDataArr.size(); RecordSetCounter++) {
					recordElement = parameterElement.addElement("Record");
					for (Object resultDataObj : resultDataArr) {
						JSONObject RecordObj = (JSONObject) resultDataObj;
						for (Iterator iterator = RecordObj.keys(); iterator.hasNext();) {
							String key = (String) iterator.next();
							fieldElement = recordElement.addElement("Field");
							fieldElement.addAttribute("name", key);
							fieldElement.addAttribute("value", RecordObj.getString(key));
						}
					}
				}
			}

		}

		return document.asXML();
	}

}
