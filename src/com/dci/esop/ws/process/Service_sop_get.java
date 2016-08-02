package com.dci.esop.ws.process;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.dom4j.Element;

import com.dci.esop.sql.ConnectionManager;

public class Service_sop_get extends ServiceProcess {

	public Service_sop_get(String requestXml) {
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
		String selectSql = ""
						+"SELECT  " 
						+"        SP001 AS sop_no    ,  " 
						+"        SP002 AS sop_ver   ,  " 
						+"        SP003 AS sop_file  ,  " 
						+"        SP004 AS sop_remark,  " 
						+"        SP005 AS item_no   ,  " 
						+"        SP006 AS op_no     ,  " 
						+"        SP007 AS subop_no  ,  " 
						+"        SP008 AS sop_seq   ,  " 
						+"        SP009 AS site_no   ,  " 
						+"        convert(varchar, SP010, 112) AS sop_datetime " 
						+"FROM  SOP " 
						+"WHERE 1=1 ";
		
		try{
			for(int i = 0; i < dataAry.size(); i++){
				JSONObject row = dataAry.getJSONObject(i);
				if(row.get("sop_no") != null && !row.getString("sop_no").equals("")){
					selectSql += " AND SP001 LIKE '%"+row.getString("sop_no")+"%' \n";
				}
				if(row.get("sop_file") != null && !row.getString("sop_file").equals("")){
					selectSql += " AND SP003 LIKE '%"+row.getString("sop_file")+"%' \n";
				}
				if(row.get("sop_remark") != null && !row.getString("sop_remark").equals("")){
					selectSql += " AND SP004 LIKE '%"+row.getString("sop_remark")+"%' \n";
				}
				if(row.get("item_no") != null && !row.getString("item_no").equals("")){
					selectSql += " AND SP005 LIKE '%"+row.getString("item_no")+"%' \n";
				}
				if(row.get("op_no") != null && !row.getString("op_no").equals("")){
					selectSql += " AND SP006 LIKE '%"+row.getString("op_no")+"%' \n";
				}
				if(row.get("site_no") != null && !row.getString("site_no").equals("")){
					selectSql += " AND SP009 LIKE '%"+row.getString("site_no")+"%' \n";
				}
				if(row.get("station_no") != null && !row.getString("sop_datetime_s").equals("") && !row.getString("sop_datetime_e").equals("")){
					SimpleDateFormat sdfparse = new SimpleDateFormat("yyyyMMddHHmmss");
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					selectSql += " AND SP010 BETWEEN '"+sdf.format(sdfparse.parse(row.getString("sop_datetime_s")))+"' AND '"+sdf.format(sdfparse.parse(row.getString("sop_datetime_e")))+"' \n";
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
