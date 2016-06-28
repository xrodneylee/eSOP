package com.dci.esop.authentication;

import net.sf.json.JSONObject;

public class UserCheck {
	
	public String loginProcess(String jsonString){
		JSONObject loginInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		
		return resultInfo.toString();
	}
}
