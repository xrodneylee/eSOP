package com.dci.esop.dao;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;

public class SOP {
	ConnectionManager conm = new ConnectionManager();
	CONFIG CONFIG = new CONFIG();
	String FileServer= CONFIG.getESOPFileRoute();
	
	public String getSOP01(String jsonString) {
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String winSql = "";
		try {
			winSql = SqlFile.getWindowsSqlFile("SOP", "01");
			List list = conm.queryForList(winSql + queryInfo.getString("Condition"), null);
			resultInfo.put("SOP_01", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return resultInfo.toString();
	}

	public String getSOP_query(String jsonString) {
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String sql = " " 
				+"SELECT  " 
				+"        ISNULL(SP001,'')             AS SP001,  " 
				+"        ISNULL(SP002,'')             AS SP002,  " 
				+"        ISNULL(SP003,'')             AS SP003,  " 
				+"        ISNULL(SP004,'')             AS SP004,  " 
				+"        ISNULL(SP005,'')             AS SP005,  " 
				+"        ISNULL(SP006,'')             AS SP006,  " 
				+"        ISNULL(SP007,'')             AS SP007,  " 
				+"        								  SP008,  " 
				+"        ISNULL(SP009,'')             AS SP009,  " 
				+"        convert(varchar, SP010, 112)    SP010,  " 
				+"        'Y'                          AS exist  " 
				+"FROM  " 
				+"        SOP  " 
				+"WHERE   1=1 ";
		
		if(!queryInfo.getString("SP001").equals("")){
			sql += " AND SP001='"+queryInfo.getString("SP001")+"'";
		}
		if(!queryInfo.getString("SP003").equals("")){
			sql += " AND SP003='"+queryInfo.getString("SP003")+"'";
		}
		if(!queryInfo.getString("SP004").equals("")){
			sql += " AND SP004='"+queryInfo.getString("SP004")+"'";
		}
		if(!queryInfo.getString("SP005").equals("")){
			sql += " AND SP005='"+queryInfo.getString("SP005")+"'";
		}
		if(!queryInfo.getString("SP006").equals("")){
			sql += " AND SP006='"+queryInfo.getString("SP006")+"'";
		}
		if(!queryInfo.getString("SP009").equals("")){
			sql += " AND SP009='"+queryInfo.getString("SP009")+"'";
		}
		if(queryInfo.getString("start")!="null" && queryInfo.getString("end")!="null"){
			sql += " AND SP010 BETWEEN '"+queryInfo.getString("start")+"' AND '"+queryInfo.getString("end")+"'";
		}
		
		List list = conm.queryForList(sql, null);
		if(list.size() > 0){
			resultInfo.put("SOP_01", list);
		}else{
			resultInfo.put("SOP_01", new ArrayList());
		}
		
		return resultInfo.toString();
	}

	public String deleteSOP(String jsonString) {
		JSONArray deleteInfo = JSONArray.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String deleteSql = " DELETE FROM SOP WHERE SP001=:SP001 AND SP002=:SP002 ";
		try {
			for(int i = 0; i < deleteInfo.size(); i++){
				JSONObject record = deleteInfo.getJSONObject(i);
				conm.sqlUpdate(deleteSql, record);
			}
			resultInfo.put("result", "success");
		} catch (Exception e) {
			resultInfo.put("result", "failure");
			e.printStackTrace();
		}
		return resultInfo.toString();
	}

}
