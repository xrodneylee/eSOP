package com.dci.esop.dao;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;

public class CONFIG {
	ConnectionManager conm = new ConnectionManager();
	
	public String getConfigData(String cd006){
		JSONObject jsonObj = new JSONObject();
		String sql = " select CD001,CD003 from CONFIG WHERE CD006='"+cd006+"' ";
		jsonObj.put("CONFIG", conm.queryForList(sql, null));
		return jsonObj.toString();
	}
	
	public void saveConfigData(String jsonString){
		JSONObject jsonObj = JSONObject.fromObject(jsonString);
		JSONArray CD001Ary = jsonObj.getJSONArray("CD001");
		JSONArray CD003Ary = jsonObj.getJSONArray("CD003");
		String sql = "";
		for(int i = 0; i < CD001Ary.size(); i++){
			sql += "\n\n"+
				" UPDATE CONFIG SET CD003='"+CD003Ary.getString(i)+"' WHERE CD001='"+CD001Ary.getString(i)+"' ";
		}
		conm.sqlUpdate(sql, null);
	}
	
	public String getSingleConfig(String cd001){
		String sql = " select CD003 from CONFIG WHERE CD001='"+cd001+"'";
		return conm.queryForSingleString(sql, null);
	}
	
	public String getGuardManagerPort(){
    	return getSingleConfig("GuardManagerPort");
    }
	
	public String getGuardManagerIP(){
    	return getSingleConfig("GuardManagerIP");
    }
	
	public String getHardwareKey(){
    	return getSingleConfig("HardwareKey");
    }
	
	public String getGuardManagerNetCard(){
    	return getSingleConfig("GuardManagerNetCard");
    }
	
	public String getMaxInactiveInterval(){
		return getSingleConfig("maxInactiveInterval");
	}
	
	public String getESOPFileRoute(){
		return getSingleConfig("eSOPFileRoute");
	}
}
