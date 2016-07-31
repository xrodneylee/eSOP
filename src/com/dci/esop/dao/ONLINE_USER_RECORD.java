package com.dci.esop.dao;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;

public class ONLINE_USER_RECORD {

	ConnectionManager conm = new ConnectionManager();
	
	public String getONLINE_USER_RECORD(){
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT OU001, OU002, CASE WHEN OU003='1' THEN 'eSOP User' END AS OU003, convert(varchar, convert(datetime, OU004), 111)+' '+convert(varchar, convert(datetime, OU004), 8) AS OU004, convert(varchar, convert(datetime, OU005), 111)+' '+convert(varchar, convert(datetime, OU005), 8) AS OU005, OU006 FROM ONLINE_USER_RECORD ";
		try {
			List list = conm.queryForList(querySql, null);
			resultInfo.put("ONLINE_USER_RECORD", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultInfo.toString();
	}

	public void delete_ONLINE_USER_RECORD(String jsonString) {
		JSONArray deleteInfo = JSONArray.fromObject(jsonString);
		String deleteSql = " DELETE ONLINE_USER_RECORD WHERE OU001=:OU001 AND OU002=:OU002 ";
		for(int i = 0; i < deleteInfo.size(); i++){
			JSONObject record = deleteInfo.getJSONObject(i);
			conm.sqlUpdate(deleteSql, record);
		}
	}

	public String getUserCount() {
		String sql = " SELECT COUNT(*) FROM ONLINE_USER_RECORD ";
		return String.valueOf(conm.queryForSingleInteger(sql, null));
	}
}
