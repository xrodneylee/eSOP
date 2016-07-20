package com.dci.esop.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;

public class STATION {

	ConnectionManager conm = new ConnectionManager();
	
	public String getSTATION_all(){
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT ST001, ISNULL(ST002,'') AS ST002, ISNULL(ST006,'') AS ST006, ISNULL(ST004,'') AS ST004, ISNULL(ST005,'') AS ST005, ISNULL(ST003,'') AS ST003 FROM STATION ";
		try {
			List list = conm.queryForList(querySql, null);
			resultInfo.put("STATION", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultInfo.toString();
	}
	
	public String getSTATION_search(String jsonString){
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT ST001, ISNULL(ST002,'') AS ST002, ISNULL(ST006,'') AS ST006, ISNULL(ST004,'') AS ST004, ISNULL(ST005,'') AS ST005, ISNULL(ST003,'') AS ST003 FROM STATION WHERE 1=1 "+queryInfo.getString("wherecon");
		try {
			List list = conm.queryForList(querySql, null);
			resultInfo.put("STATION", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultInfo.toString();
	}

	public String deleteUser(String jsonObj) {
		JSONObject deleteInfo = JSONObject.fromObject(jsonObj);
		JSONObject resultInfo = new JSONObject();
		String deleteSql = " DELETE FROM STATION WHERE ST001=:ST001 ";
		try {
			conm.sqlUpdate(deleteSql, deleteInfo);
			resultInfo.put("result", "success");
		} catch (Exception e) {
			resultInfo.put("result", "failure");
			e.printStackTrace();
		}
		return resultInfo.toString();
	}

	public String saveUser(String jsonObj) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		JSONObject saveInfo = JSONObject.fromObject(jsonObj);
		JSONObject resultInfo = new JSONObject();
		saveInfo.put("DATE", sdf.format(new Date()));
		String saveSql = " INSERT INTO STATION (CREATER, CREATE_DATE, MODEIFIER, MODI_DATE, FLAG, ST001, ST002, ST003, ST004, ST005, ST006) VALUES(:USERID, :DATE, :USERID, :DATE, 0, :ST001, :ST002, :ST003, :ST004, :ST005, :ST006)";
		try {
			if(conm.queryForSingleInteger(SqlFile.getCheckSqlFile("STATION", "01"), saveInfo) > 0){
				saveSql = " UPDATE STATION SET MODEIFIER=:USERID, MODI_DATE=:DATE, FLAG=FLAG+1, ST002=:ST002, ST003=:ST003, ST004=:ST004, ST005=:ST005, ST006=:ST006 WHERE ST001=:ST001 ";
			}
			conm.sqlUpdate(saveSql, saveInfo);
			resultInfo.put("result", "success");
		} catch (Exception e) {
			resultInfo.put("result", "failure");
			e.printStackTrace();
		}
		return resultInfo.toString();
	}
}
