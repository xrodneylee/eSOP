package com.dci.esop.authentication;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;

import net.sf.json.JSONObject;

public class UserCheck {
	ConnectionManager conm = new ConnectionManager();
	
	public String loginProcess(String jsonString){
		JSONObject loginInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String checkSql = "";
		try {
			checkSql = SqlFile.getCheckSqlFile("PRINCIPAL", "01");
			if(conm.queryForSingleInteger(checkSql, loginInfo) > 0){
				resultInfo.put("result", "success");
				resultInfo.put("url", "/eSOP/centerPage/centerPage.jsp?userId="+loginInfo.getString("AUTH_ID"));
			}else{
				resultInfo.put("result", "failure");
			}
		} catch (Exception e) {
			resultInfo.put("result", e.getMessage());
			e.printStackTrace();
		}
		
		return resultInfo.toString();
	}
}
