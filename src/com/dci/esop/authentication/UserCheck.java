package com.dci.esop.authentication;

import java.io.UnsupportedEncodingException;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;
import com.digwin.cross.exception.IllegalDataException;
import com.digwin.cross.util.CodeUtil;

import net.sf.json.JSONObject;

public class UserCheck {
	ConnectionManager conm = new ConnectionManager();
	
	public String loginProcess(String jsonString){
		JSONObject loginInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String checkSql = "";
		try {
			checkSql = SqlFile.getCheckSqlFile("PRINCIPAL", "01");
			loginInfo.put("AUTH_PASSWORD", CodeUtil.encodeMessage(loginInfo.getString("AUTH_PASSWORD")));
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
	
	public static void main(String[] args) throws UnsupportedEncodingException, IllegalDataException{
		System.out.println(CodeUtil.encodeMessage("DS"));
	}
}
