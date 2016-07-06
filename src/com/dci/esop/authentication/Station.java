package com.dci.esop.authentication;

import java.util.List;

import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;

public class Station {
	ConnectionManager conm = new ConnectionManager();
	
	public String stationCheck(String jsonString){
		JSONObject registerInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String checkSql = "";
		try {
			checkSql = SqlFile.getCheckSqlFile("STATION", "01");
			if(conm.queryForSingleInteger(checkSql, registerInfo) > 0){
				resultInfo.put("result", "success");
			}else{
				resultInfo.put("result", "failure");
			}
		} catch (Exception e) {
			resultInfo.put("result", e.getMessage());
			e.printStackTrace();
		}
		
		return resultInfo.toString();
	}
	
	public String getStationInit(String jsonString){
		JSONObject registerInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String checkSql = "";
		try {
			checkSql = SqlFile.getCheckSqlFile("STATION", "03");
			List list = conm.queryForList(checkSql, registerInfo);
			if(list.size() > 0){
				resultInfo.put("result", "success");
				resultInfo.put("record", list);
			}else{
				resultInfo.put("result", "failure");
			}
		} catch (Exception e) {
			resultInfo.put("result", e.getMessage());
			e.printStackTrace();
		}
		
		return resultInfo.toString();
	}
	
	public String isValid(String jsonString){
		JSONObject registerInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String checkSql = "";
		try {
			checkSql = SqlFile.getCheckSqlFile("STATION", "02");
			if(conm.queryForSingleInteger(checkSql, registerInfo) > 0){
				resultInfo.put("result", "invalid");
			}else{
				resultInfo.put("result", "valid");
			}
		} catch (Exception e) {
			resultInfo.put("result", e.getMessage());
			e.printStackTrace();
		}
		
		return resultInfo.toString();
	}
	
	public String register(String jsonString){
		JSONObject registerInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String insertSql = "INSERT INTO STATION (ST001, ST002, ST003, ST004, ST005) VALUES(:ST001, :ST002, :ST003, :ST004, :ST005)";
		try {
			conm.sqlUpdate(insertSql, registerInfo);
			resultInfo.put("result", "success");
		} catch (Exception e) {
			resultInfo.put("result", e.getMessage());
			e.printStackTrace();
		}
		
		return resultInfo.toString();
	}
}
