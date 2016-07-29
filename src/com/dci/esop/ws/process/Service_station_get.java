package com.dci.esop.ws.process;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.dom4j.Element;

import com.dci.esop.sql.ConnectionManager;

public class Service_station_get extends ServiceProcess  {

	public Service_station_get(String requestXml) {
		super(requestXml);
	}

	private JSONObject getExecuteData() {
		JSONObject jsonObj = new JSONObject();
		Element data = (Element) xmlBaseData.get("data");
		List DataList = data.selectNodes("row");
		JSONArray bodyJsonArr = new JSONArray();
		JSONObject jsonBodySubObj = new JSONObject();
		List fieldList;
		Element rowElement, fieldElement;
		
		for(Object rowObj : DataList){
			rowElement = (Element) rowObj;
			fieldList = rowElement.selectNodes("field");
			jsonBodySubObj = new JSONObject();
			jsonBodySubObj.put("seq", rowElement.attributeValue("seq").toString().trim());
			for (Object fieldObj : fieldList) {
				fieldElement = (Element) fieldObj;
				jsonBodySubObj.put(fieldElement.attributeValue("name"), fieldElement.getTextTrim());
			}
			bodyJsonArr.add(jsonBodySubObj);
		}
		jsonObj.put("data", bodyJsonArr);
		return jsonObj;
	}
	
	@Override
	public Map executeService() {
		ConnectionManager conm = new ConnectionManager();
		Map resultMap = new HashMap();
		JSONObject jsonData = getExecuteData();
		JSONArray dataAry = jsonData.getJSONArray("data");
		String selectSql = " SELECT ST001 AS station_no, ST002 AS station_remark, ST004 AS station_section, ST005 AS site_no, ST006 AS station_valid FROM STATION WHERE 1=1 \n";
		try{
			for(int i = 0; i < dataAry.size(); i++){
				JSONObject row = dataAry.getJSONObject(i);
				if(!row.getString("station_no").equals("")){
					selectSql += " AND ST001 LIKE '%"+row.getString("station_no")+"%' \n";
				}
				if(!row.getString("station_remark").equals("")){
					selectSql += " AND ST002 LIKE '%"+row.getString("station_remark")+"%' \n";
				}
				if(!row.getString("station_section").equals("")){
					selectSql += " AND ST004 LIKE '%"+row.getString("station_section")+"%' \n";
				}
				if(!row.getString("site_no").equals("")){
					selectSql += " AND ST005 LIKE '%"+row.getString("site_no")+"%' \n";
				}
				List responseData = conm.queryForList(selectSql, null);
				resultMap.put("responseData", responseData);
			}
			resultMap.put("code", "0");
			resultMap.put("description", "");
			resultMap.put("service", xmlBaseData.get("service").toString());
		}catch(Exception e){
			resultMap.put("code", "1");
			resultMap.put("description", e.getMessage());
			e.printStackTrace();
		}
		return resultMap;
	}

}
