package com.dci.esop.sql;

import net.sf.json.JSONObject;

public class SqlFile {
	/**
	 * 取得檢核檔或開窗檔語法
	 * @param table 資料表名稱
	 * @param NumberOfGroups 組數
	 * @param type 0：檢核檔；1：開窗檔
	 * @return
	 */
	public String getSql(String table, String NumberOfGroups, String type){
		ConnectionManager conm = new ConnectionManager();
		JSONObject json = new JSONObject();
		String sql = " SELECT SF004 "
				+ " FROM SQLFILE "
				+ " WHERE SF001=:SF001 "
				+ " AND SF002=:SF002 "
				+ " AND SF003=:SF003 ";
		
		json.put("SF001", table);
		json.put("SF002", NumberOfGroups);
		json.put("SF003", type);
		
		return conm.queryForSingleString(sql, json);
	}
}
