package com.dci.esop.authentication;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;

public class Station {
	public static final String itemid = "1";
	public static final String operation = "2";
	public static final String factory = "3";
	public static final String area = "4";
	
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
		conm.setAutoCommit(false);
		try {
			conm.sqlUpdate(insertSql, registerInfo);
			insertATTRIBUTE_LIST(area,registerInfo.getString("ST004"));
			insertATTRIBUTE_LIST(factory,registerInfo.getString("ST005"));
			resultInfo.put("result", "success");
			conm.transactionCommit();
		} catch (Exception e) {
			resultInfo.put("result", e.getMessage());
			conm.transactionRollback();
			e.printStackTrace();
		}
		
		return resultInfo.toString();
	}
	
	public void insertATTRIBUTE_LIST(String al001,String al002) throws Exception{
		Map data = new HashMap();
		String checkSql = SqlFile.getCheckSqlFile("ATTRIBUTE_LIST", "01");
		String insertSql = "INSERT INTO ATTRIBUTE_LIST (AL001, AL002) VALUES(:AL001, :AL002)";
		
		data.put("AL001", al001);
		data.put("AL002", al002);
		
		if(conm.queryForSingleInteger(checkSql, data) == 0){
			conm.sqlUpdate(insertSql, data);
		}
		
	}
}
