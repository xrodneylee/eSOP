package com.dci.esop.config;

import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;

public class SFTConfig {

	private String getSysConfig(String element) {
		ConnectionManager conm = new ConnectionManager();
		JSONObject queryInfo = new JSONObject();
		String CD003 = "";
		try {
			
			queryInfo.put("CD001", element);
			CD003 = conm.queryForSingleString(SqlFile.getCheckSqlFile("CONFIG", "01"), queryInfo);

		} catch (Exception e) {

			e.printStackTrace();
		}

		return CD003;
	}
	
	/**
	 * GuardManager IP
	 */
	public String getGuardManagerIP() {
		return getSysConfig("GuardManagerIP");
	}
	
	/**
	 * GuardManager Port
	 */
	public String getGuardManagerPort() {
		return getSysConfig("GuardManagerPort");
	}

	/**
	 * GuardManager NetCard
	 */
	public String getGuardManagerNetCard() {
		return getSysConfig("GuardManagerNetCard");
	}
}
