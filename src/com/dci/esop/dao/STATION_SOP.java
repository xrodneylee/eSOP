package com.dci.esop.dao;

import java.util.List;

import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;

public class STATION_SOP {
	ConnectionManager conm = new ConnectionManager();
	
	public String getChoiceList(String jsonString) {
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT SS001, SS002, SS003, SS004, SS005, SS006, ISNULL(SS007,'') AS SS007, SS008 FROM STATION_SOP WHERE SS001=:SS001 ORDER BY SS002 ";
		
		List list = conm.queryForList(querySql, queryInfo);
		if(list.size() > 0){
			resultInfo.put("result", "success");
			resultInfo.put("record", list);
		}else{
			resultInfo.put("result", "failure");
		}
		return resultInfo.toString();
	}

	public String getSingleVersion(String jsonString) {
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT SS001, SS002, SS003, SS004, SS005, SS006, ISNULL(SS007,'') AS SS007, SS008 FROM STATION_SOP WHERE SS001=:SS001 AND SS003=:SS003 AND SS004=:SS004 ";
		
		List list = conm.queryForList(querySql, queryInfo);
		if(list.size() > 0){
			resultInfo.put("result", "success");
			resultInfo.put("record", list);
		}else{
			resultInfo.put("result", "failure");
		}
		return resultInfo.toString();
	}
}
