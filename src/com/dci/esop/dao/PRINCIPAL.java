package com.dci.esop.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;
import com.digwin.cross.util.CodeUtil;

public class PRINCIPAL {

	ConnectionManager conm = new ConnectionManager();
	
	public String getPRINCIPAL_all(){
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT AUTH_ID, ISNULL(AUTH_NAME,'') AS AUTH_NAME, ISNULL(AUTH_PASSWORD,'') AS AUTH_PASSWORD FROM PRINCIPAL ";
		try {
			List list = conm.queryForList(querySql, null);
			for(int i = 0; i < list.size(); i++){
				Map record = (Map)list.get(i);
				record.put("AUTH_PASSWORD", CodeUtil.decodeMessage(record.get("AUTH_PASSWORD").toString()));
				list.set(i, record);
			}
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
			for(int i = 0; i < list.size(); i++){
				Map record = (Map)list.get(i);
				record.put("AUTH_PASSWORD", CodeUtil.decodeMessage(record.get("AUTH_PASSWORD").toString()));
				list.set(i, record);
			}
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
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		JSONObject saveInfo = JSONObject.fromObject(jsonObj);
		JSONObject resultInfo = new JSONObject();
		saveInfo.put("DATE", sdf.format(new Date()));
		String saveSql = " INSERT INTO PRINCIPAL (CREATER, CREATE_DATE, MODEIFIER, MODI_DATE, FLAG, AUTH_ID, AUTH_NAME, AUTH_PASSWORD) VALUES(:USERID, :DATE, :USERID, :DATE, 0, :AUTH_ID, :AUTH_NAME, :AUTH_PASSWORD)";
		try {
			if(conm.queryForSingleInteger(SqlFile.getCheckSqlFile("PRINCIPAL", "02"), saveInfo) > 0){
				saveSql = " UPDATE PRINCIPAL SET MODEIFIER=:USERID, MODI_DATE=:DATE, FLAG=FLAG+1, AUTH_NAME=:AUTH_NAME, AUTH_PASSWORD=:AUTH_PASSWORD WHERE AUTH_ID=:AUTH_ID ";
			}
			saveInfo.put("AUTH_PASSWORD", CodeUtil.encodeMessage(saveInfo.getString("AUTH_PASSWORD")));
			conm.sqlUpdate(saveSql, saveInfo);
			resultInfo.put("result", "success");
		} catch (Exception e) {
			resultInfo.put("result", "failure");
			e.printStackTrace();
		}
		return resultInfo.toString();
	}
}
