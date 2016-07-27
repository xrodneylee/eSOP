package com.dci.esop.ws.serviceXMLHandle;

import java.util.Map;

import org.dom4j.DocumentException;

abstract public class XMLProcess {

	abstract public Map requestXMLDecomposition(String xml) throws DocumentException;

	abstract public String responseXMLComposition(Map resultMap);

}
