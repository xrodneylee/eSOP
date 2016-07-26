package com.dci.esop.dao;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;

public class STATION_HISTORY {

	ConnectionManager conm = new ConnectionManager();
	
	public String getChoiceList(String jsonString) {
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT SH001, SH002, SH003, SH004, SH005, SH006, ISNULL(SH007,'') AS SH007, SH008, SH009, SH010 FROM STATION_HISTORY WHERE SH001=:SH001 ORDER BY SH002 ";
		
		List list = conm.queryForList(querySql, queryInfo);
		if(list.size() > 0){
			resultInfo.put("result", "success");
			resultInfo.put("record", list);
		}else{
			resultInfo.put("result", "failure");
		}
		return resultInfo.toString();
	}
	
	public String getSingleVersion(String jsonString) {
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT SH001, SH002, SH003, SH004, SH005, SH006, ISNULL(SH007,'') AS SH007, SH008 FROM STATION_HISTORY WHERE SH001=:SH001 AND SH003=:SH003 AND SH004=:SH004 ";
		
		List list = conm.queryForList(querySql, queryInfo);
		if(list.size() > 0){
			resultInfo.put("result", "success");
			resultInfo.put("record", list);
		}else{
			resultInfo.put("result", "failure");
		}
		return resultInfo.toString();
	}
	
	public String insertHistory(String jsonString) {
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT SS001, SS002, SS003, SS004, SS005, SS006, ISNULL(SS007,'') AS SS007, SS008 FROM STATION_SOP WHERE SS001=:SS001 ORDER BY SS002 ";
		String insertSql = "";
		try{
			List list = conm.queryForList(querySql, queryInfo);
			int sh002 = (int)conm.queryForSingleDouble(" SELECT SH002 FROM STATION_HISTORY WHERE SH001=:SS001 ORDER BY SH002 DESC ", queryInfo);
		
			if(list.size() > 0){
				for(int i = 0; i < list.size(); i++){
					insertSql = " INSERT INTO STATION_HISTORY (SH001, SH002, SH003, SH004, SH005, SH006, SH007, SH008, SH010) VALUES(:SS001, '"+(sh002+i+1)+"', :SS003, :SS004, :SS005, :SS006, :SS007, :SS008, :SS002)";
					Map record = (Map)list.get(i);
					conm.sqlUpdate(insertSql, record);
				}
			}
			resultInfo.put("result", "success");
		}catch(Exception e){
			e.printStackTrace();
			resultInfo.put("result", "failure");
		}
		
		return resultInfo.toString();
	}

}
