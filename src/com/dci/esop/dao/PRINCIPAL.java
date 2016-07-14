package com.dci.esop.dao;

import java.util.List;

import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;

public class PRINCIPAL {

	ConnectionManager conm = new ConnectionManager();
	
	public String getPRINCIPAL(){
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT AUTH_ID, ISNULL(AUTH_NAME,'') AS AUTH_NAME, ISNULL(AUTH_PASSWORD,'') AS AUTH_PASSWORD FROM PRINCIPAL ";
		try {
			List list = conm.queryForList(querySql, null);
			resultInfo.put("PRINCIPAL", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(">>>>"+resultInfo.toString());
		return resultInfo.toString();
	}
}
