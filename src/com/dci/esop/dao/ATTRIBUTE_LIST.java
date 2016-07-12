package com.dci.esop.dao;

import java.util.List;

import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;

public class ATTRIBUTE_LIST {
	ConnectionManager conm = new ConnectionManager();
	
	public String getATTRIBUTE_LIST01(String jsonString){
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String winSql = "";
		try {
			winSql = SqlFile.getWindowsSqlFile("ATTRIBUTE_LIST", "01");
			List list = conm.queryForList(winSql + queryInfo.getString("Condition"), null);
			resultInfo.put("ATTRIBUTE_LIST_01", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return resultInfo.toString();
	}
}
