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

public class MESXMLProcess extends XMLProcess {

	public Map requestXMLDecomposition(String xml) throws DocumentException {
		Map baseData = new HashMap();
		return baseData;
	}

	public String responseXMLComposition(Map resultMap) {
		Document document = DocumentHelper.createDocument();

		return document.asXML();
	}

}
