package com.dci.esop.dao;

import java.util.List;

import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;

public class PRINCIPAL {

	ConnectionManager conm = new ConnectionManager();
	
	public String getPRINCIPAL_all(){
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT AUTH_ID, ISNULL(AUTH_NAME,'') AS AUTH_NAME, ISNULL(AUTH_PASSWORD,'') AS AUTH_PASSWORD FROM PRINCIPAL ";
		try {
			List list = conm.queryForList(querySql, null);
			resultInfo.put("PRINCIPAL", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultInfo.toString();
	}
	
	public String getPRINCIPAL_search(String jsonString){
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT AUTH_ID, ISNULL(AUTH_NAME,'') AS AUTH_NAME, ISNULL(AUTH_PASSWORD,'') AS AUTH_PASSWORD FROM PRINCIPAL WHERE 1=1 "+queryInfo.getString("wherecon");
		try {
			List list = conm.queryForList(querySql, null);
			resultInfo.put("PRINCIPAL", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultInfo.toString();
	}

	public String deleteUser(String jsonObj) {
		JSONObject deleteInfo = JSONObject.fromObject(jsonObj);
		JSONObject resultInfo = new JSONObject();
		String deleteSql = " DELETE FROM PRINCIPAL WHERE AUTH_ID=:AUTH_ID ";
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
		JSONObject saveInfo = JSONObject.fromObject(jsonObj);
		JSONObject resultInfo = new JSONObject();
		String saveSql = " INSERT INTO PRINCIPAL (AUTH_ID, AUTH_NAME, AUTH_PASSWORD) VALUES(:AUTH_ID, :AUTH_NAME, :AUTH_PASSWORD)";
		try {
			if(conm.queryForSingleInteger(SqlFile.getCheckSqlFile("PRINCIPAL", "02"), saveInfo) > 0){
				saveSql = " UPDATE PRINCIPAL SET AUTH_NAME=:AUTH_NAME, AUTH_PASSWORD=:AUTH_PASSWORD WHERE AUTH_ID=:AUTH_ID ";
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
