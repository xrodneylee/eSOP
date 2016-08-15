package com.dci.esop.ws.process;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.dom4j.Element;

import com.dci.esop.sql.ConnectionManager;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Service_sop_display_process extends ServiceProcess {

	public Service_sop_display_process(String requestXml) {
		super(requestXml);
	}

	private JSONObject getExecuteData() {
		JSONObject jsonObj = new JSONObject();
		Element data = (Element) xmlBaseData.get("data");
		List DataList = data.selectNodes("row");
		JSONArray bodyJsonArr = new JSONArray();
		JSONObject jsonBodySubObj = new JSONObject();
		List fieldList;
		Element rowElement, fieldElement;
		
		for(Object rowObj : DataList){
			rowElement = (Element) rowObj;
			fieldList = rowElement.selectNodes("field");
			jsonBodySubObj = new JSONObject();
			jsonBodySubObj.put("seq", rowElement.attributeValue("seq").toString().trim());
			for (Object fieldObj : fieldList) {
				fieldElement = (Element) fieldObj;
				jsonBodySubObj.put(fieldElement.attributeValue("name"), fieldElement.getTextTrim());
			}
			bodyJsonArr.add(jsonBodySubObj);
		}
		jsonObj.put("data", bodyJsonArr);
		return jsonObj;
	}
	
	@Override
	public Map executeService() {
		ConnectionManager conm = new ConnectionManager();
		SimpleDateFormat sdfparse = new SimpleDateFormat("yyyyMMddHHmmss");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Map resultMap = new HashMap();
		JSONObject jsonData = getExecuteData();
		JSONArray dataAry = jsonData.getJSONArray("data");
		String deleteSql = " DELETE STATION_SOP WHERE SS001=:station_no ";
		String updateSql = " UPDATE STATION SET ST011=:report_datetime WHERE ST001=:station_no ";
		String station_sop_sql = getInsertSTATION_SOP_sql();
		String station_history_sql = getInsertSTATION_HISTORY_sql();
		String insertSql = station_sop_sql+station_history_sql;
		Set stationSet = new HashSet();
		String code = "0";
		conm.setAutoCommit(false);
		try{
			for(int i = 0; i < dataAry.size(); i++){
				JSONObject row = dataAry.getJSONObject(i);
				//檢核段
				if(conm.queryForSingleInteger(" SELECT COUNT(1) FROM STATION WHERE ST001=:station_no ", row) == 0){
					code = "101";
					throw new Exception("101:指定工位有誤"+row.getString("station_no")+"不存在");
				}
				
				if(row.getString("sop_file").equals("") && conm.queryForSingleInteger(" SELECT COUNT(1) FROM SOP WHERE SP001=:sop_no AND SP002=:sop_ver ", row) == 0){
					code = "102";
					throw new Exception("102:指定SOP有誤:"+row.getString("sop_no")+" 版號："+row.getString("sop_ver")+" 不存在");
				}
				
				if(row.getString("sop_no").equals("") && conm.queryForSingleInteger(" SELECT COUNT(1) FROM SOP WHERE SP003=:sop_file ", row) == 0){
					code = "103";
					throw new Exception("103:指定SOP實體檔名有誤："+row.getString("sop_file")+" 不存在");
				}
				//更新段
				if(!stationSet.contains(row.getString("station_no"))){
					conm.sqlUpdate(deleteSql, row);
					stationSet.add(row.getString("station_no"));
				}
				
				int sh002 = (int)conm.queryForSingleDouble(" SELECT SH002 FROM STATION_HISTORY WHERE SH001=:station_no ORDER BY SH002 DESC ", row);
				row.put("CREATER", xmlBaseData.get("CREATER"));
				row.put("historySeq", (sh002+1));
				row.put("DATE", sdf.format(sdfparse.parse(row.getString("report_datetime"))));
				conm.sqlUpdate(insertSql, row);//插入STATION_SOP和STATION_HISTORY
				conm.sqlUpdate(updateSql, row);//更新STATION.ST011(最近推播碼)
			}
			conm.transactionCommit();
			resultMap.put("code", code);
			resultMap.put("description", "");
		}catch(Exception e){
			conm.transactionRollback();
			resultMap.put("code", code);
			resultMap.put("description", e.getMessage());
			e.printStackTrace();
		}
		
		return resultMap;
	}

	private String getInsertSTATION_SOP_sql(){
		String station_sop_sql = "\n\n"
				+"INSERT INTO STATION_SOP  " 
				+"        (  " 
				+"                CREATER     ,  " 
				+"                CREATE_DATE ,  " 
				+"                MODEIFIER   ,  " 
				+"                MODI_DATE   ,  " 
				+"                SS001       ,  " 
				+"                SS002       ,  " 
				+"                SS003       ,  " 
				+"                SS004       ,  " 
				+"                SS005       ,  " 
				+"                SS006       ,  " 
				+"                SS007       ,  " 
				+"                SS008  " 
				+"        )  " 
				+"        VALUES  " 
				+"        (  " 
				+"                :CREATER       ,  " 
				+"                :DATE          ,  " 
				+"                :CREATER       ,  " 
				+"                :DATE          ,  " 
				+"                :station_no    ,  " 
				+"                :seq           ,  " 
				+"                :sop_no        ,  " 
				+"                :sop_ver       ,  " 
				+"                :sop_file      ,  " 
				+"                :sop_ver_assign,  " 
				+"                :sop_page      ,  " 
				+"                :remark  " 
				+"        )\n\n";
		return station_sop_sql;
	}
	
	private String getInsertSTATION_HISTORY_sql(){
		String station_history_sql = "\n\n"
				+"INSERT INTO STATION_HISTORY  " 
				+"        (  " 
				+"                CREATER     ,  " 
				+"                CREATE_DATE ,  " 
				+"                MODEIFIER   ,  " 
				+"                MODI_DATE   ,  " 
				+"                SH001       ,  " 
				+"                SH002       ,  " 
				+"                SH003       ,  " 
				+"                SH004       ,  " 
				+"                SH005       ,  " 
				+"                SH006       ,  " 
				+"                SH007       ,  " 
				+"                SH008  " 
				+"        )  " 
				+"        VALUES  " 
				+"        (  " 
				+"                :CREATER       ,  " 
				+"                :DATE          ,  " 
				+"                :CREATER       ,  " 
				+"                :DATE          ,  " 
				+"                :station_no    ,  " 
				+"                :historySeq    ,  " 
				+"                :sop_no        ,  " 
				+"                :sop_ver       ,  " 
				+"                :sop_file      ,  " 
				+"                :sop_ver_assign,  " 
				+"                :sop_page      ,  " 
				+"                :remark  " 
				+"        )\n\n";
		return station_history_sql;
	}
}
