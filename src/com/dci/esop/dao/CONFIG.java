package com.dci.esop.dao;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;

public class CONFIG {
	ConnectionManager conm = new ConnectionManager();
	
	public String getConfigData(String cd006){
		JSONObject jsonObj = new JSONObject();
		String sql = " select CD001,CD003 from CONFIG WHERE CD006='"+cd006+"' ";
		List list = conm.queryForList(sql, null);
		for(int i = 0; i < list.size(); i++){
			Map record = (Map)list.get(i);
			if(record.get("CD001").toString().equals("maxInactiveInterval")){
				record.put("CD003", Long.parseLong(record.get("CD003").toString())/60);
				list.set(i, record);
				break;
			}
		}
		jsonObj.put("CONFIG", list);
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
