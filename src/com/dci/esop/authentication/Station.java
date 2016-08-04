package com.dci.esop.authentication;

import java.text.SimpleDateFormat;
import java.util.Date;
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
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		JSONObject registerInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		registerInfo.put("DATE", sdf.format(new Date()));
		String insertSql = "INSERT INTO STATION (CREATER, CREATE_DATE, MODEIFIER, MODI_DATE, FLAG, ST001, ST002, ST003, ST004, ST005) VALUES('註冊', :DATE, '註冊', :DATE, 0, :ST001, :ST002, :ST003, :ST004, :ST005)";
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

	public String getStationKanban(String jsonString) {
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT ST001,ST002,ST006,ST007,ST009,ST010,SP003, "+
						"	CASE WHEN ST006='N' THEN '失效'	 WHEN ST007='Y' THEN '上線'	 ELSE '離線' END AS STATUS "+
						" 	FROM STATION "+
						" 	JOIN SOP ON ST009=SP001 AND ST010=SP002 "+
						" 	WHERE 1=1 ";
		if(!queryInfo.getString("ST004").equals("")){
			querySql += " AND ST004=:ST004 ";
		}
		if(!queryInfo.getString("ST005").equals("")){
			querySql += " AND ST005=:ST005 ";
		}
		querySql += "	ORDER BY ST001 ";
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
