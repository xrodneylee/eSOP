package com.dci.esop.sql;

import net.sf.json.JSONObject;

public class SqlFile {
	
	/**
	 * 取得檢核檔
	 * @param sf001 主表名
	 * @param sf002 組數
	 * @return 內容 SQLFILE.SF004
	 * @throws Exception 
	 */
	public static String getCheckSqlFile(String sf001,String sf002) throws Exception{
		String sql = getSql(sf001,sf002,"0");
		if(sql.equals("")){
			throw new Exception("無檢核檔 "+sf001+"-"+sf002+" 資料，請聯繫產品部");
		}else{
			return sql;
		}
	}
	
	/**
	 * 取得開窗檔
	 * @param sf001 主表名
	 * @param sf002 組數
	 * @return 內容 SQLFILE.SF004
	 * @throws Exception 
	 */
	public static String getWindowsSqlFile(String sf001,String sf002) throws Exception{
		String sql = getSql(sf001,sf002,"1");
		if(sql.equals("")){
			throw new Exception("無開窗檔 "+sf001+"-"+sf002+" 資料，請聯繫產品部");
		}else{
			return sql;
		}
	}
	
	/**
	 * 取得檢核檔或開窗檔語法
	 * @param sf001 資料表名稱
	 * @param sf002 組數
	 * @param sf003 0：檢核檔；1：開窗檔
	 * @return
	 */
	private static String getSql(String sf001, String sf002, String sf003){
		ConnectionManager conm = new ConnectionManager();
		JSONObject json = new JSONObject();
		String sql = " SELECT ISNULL(SF004,'') AS SF004 "
					+ " FROM SQLFILE with (nolock) "
					+ " WHERE SF001=:SF001 "
					+ " AND SF002=:SF002 "
					+ " AND SF003=:SF003 ";
		
		json.put("SF001", sf001);
		json.put("SF002", sf002);
		json.put("SF003", sf003);
		
		return conm.queryForSingleString(sql, json);
	}
}
