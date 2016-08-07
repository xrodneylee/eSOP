package com.dci.esop.authentication;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.dci.esop.register.CryptoManager;
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
				if(checkUserIpExsit(loginInfo.getString("AUTH_ID"),loginInfo.getString("ip"))){
					resultInfo.put("result", "failure");
					resultInfo.put("msg", "此帳號己登入eSOP");
				}else{
					addUser(loginInfo.getString("AUTH_ID"),loginInfo.getString("ip"),1,loginInfo.getString("sessionId"));
					resultInfo.put("result", "success");
					resultInfo.put("url", "/eSOP/centerPage/centerPage.jsp?userId="+loginInfo.getString("AUTH_ID"));
				}
			}else{
				resultInfo.put("result", "failure");
				resultInfo.put("msg", "驗證錯誤");
			}
		} catch (Exception e) {
			resultInfo.put("result", "failure");
			resultInfo.put("msg", e.getMessage());
			e.printStackTrace();
		}
		
		return resultInfo.toString();
	}
	
	public void addUser(String id, String ip, int type, String session) {
		Date todaysDate = new java.util.Date();
		Map dataMap = new HashMap();
		String sql = "";

		dataMap.put("OU001", id);
		dataMap.put("OU002", ip);
		dataMap.put("OU003", type);
		dataMap.put("OU004", todaysDate);
		dataMap.put("OU005", todaysDate);
		dataMap.put("OU006", session);

		sql = "SELECT COUNT(*) FROM ONLINE_USER_RECORD WHERE OU001=:OU001 AND OU002=:OU002 ";
		if (conm.queryForSingleInteger(sql, dataMap) > 0) {
			sql = "UPDATE ONLINE_USER_RECORD SET OU003=:OU003,OU004=:OU004,OU005=:OU005,OU006=:OU006 WHERE OU001=:OU001 AND OU002=:OU002 ";
		} else {
			sql = "INSERT ONLINE_USER_RECORD (OU001,OU002,OU003,OU004,OU005,OU006) VALUES(:OU001,:OU002,:OU003,:OU004,:OU005,:OU006)";
		}
		conm.sqlUpdate(sql, dataMap);
	}
	
	public boolean checkUserIpExsit(String id, String ip) {
		boolean result = false;

		String sql = "SELECT COUNT(*) FROM ONLINE_USER_RECORD WHERE OU001=:OU001 AND OU002=:OU002";
		Map dataMap = new HashMap();
		dataMap.put("OU001", id);
		dataMap.put("OU002", ip);
		if (conm.queryForSingleInteger(sql, dataMap) > 0)
			result = true;

		return result;
	}

	public void removeUser(String id, String ip, String session) {

		String sql = "DELETE FROM ONLINE_USER_RECORD WHERE OU001=:OU001 AND OU002=:OU002 AND OU006=:OU006";
		Map dataMap = new HashMap();
		dataMap.put("OU001", id);
		dataMap.put("OU002", ip);
		dataMap.put("OU006", session);
		conm.sqlUpdate(sql, dataMap);
	}
	
	public void removeUser(String id, String ip) {
		String sql = "DELETE FROM ONLINE_USER_RECORD WHERE OU001=:OU001 AND OU002=:OU002";
		Map dataMap = new HashMap();
		dataMap.put("OU001", id);
		dataMap.put("OU002", ip);
		conm.sqlUpdate(sql, dataMap);
	}
	
	public void logout(String jsonString) {
		JSONObject logoutInfo = JSONObject.fromObject(jsonString);
		removeUser(logoutInfo.getString("userID"),logoutInfo.getString("ip"),logoutInfo.getString("sessionId"));
	}
	
	public int getOnlineMaxUser(){
		CryptoManager cm = CryptoManager.getInstance();
    	return  cm.getPassTotalUqtyForSFTModule();
    }
}
