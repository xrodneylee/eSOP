package com.dci.esop.dao;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.sql.SqlFile;

public class SOP {
	ConnectionManager conm = new ConnectionManager();
	CONFIG CONFIG = new CONFIG();
	String FileServer= CONFIG.getESOPFileRoute();
	
	public String getSOP01(String jsonString) {
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String winSql = "";
		try {
			winSql = SqlFile.getWindowsSqlFile("SOP", "01");
			List list = conm.queryForList(winSql + queryInfo.getString("Condition"), null);
			resultInfo.put("SOP_01", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return resultInfo.toString();
	}

	public String getSOP_query(String jsonString) {
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String sql = " " 
				+"SELECT  " 
				+"        ISNULL(SP001,'')             AS SP001,  " 
				+"        ISNULL(SP002,'')             AS SP002,  " 
				+"        ISNULL(SP003,'')             AS SP003,  " 
				+"        ISNULL(SP004,'')             AS SP004,  " 
				+"        ISNULL(SP005,'')             AS SP005,  " 
				+"        ISNULL(SP006,'')             AS SP006,  " 
				+"        ISNULL(SP007,'')             AS SP007,  " 
				+"        								  SP008,  " 
				+"        ISNULL(SP009,'')             AS SP009,  " 
				+"        convert(varchar, SP010, 112)    SP010,  " 
				+"        'Y'                          AS exist,  "
				+"        convert(varchar, MODI_DATE, 120) MODI_DATE " 
				+"FROM  " 
				+"        SOP  " 
				+"WHERE   1=1 ";
		
		if(!queryInfo.getString("SP001").equals("")){
			sql += " AND SP001='"+queryInfo.getString("SP001")+"'";
		}
		if(!queryInfo.getString("SP003").equals("")){
			sql += " AND SP003='"+queryInfo.getString("SP003")+"'";
		}
		if(!queryInfo.getString("SP004").equals("")){
			sql += " AND SP004='"+queryInfo.getString("SP004")+"'";
		}
		if(!queryInfo.getString("SP005").equals("")){
			sql += " AND SP005='"+queryInfo.getString("SP005")+"'";
		}
		if(!queryInfo.getString("SP006").equals("")){
			sql += " AND SP006='"+queryInfo.getString("SP006")+"'";
		}
		if(!queryInfo.getString("SP009").equals("")){
			sql += " AND SP009='"+queryInfo.getString("SP009")+"'";
		}
		if(queryInfo.getString("start")!="null" && queryInfo.getString("end")!="null"){
			sql += " AND SP010 BETWEEN '"+queryInfo.getString("start")+"' AND '"+queryInfo.getString("end")+"'";
		}
		
		List list = conm.queryForList(sql, null);
		if(list.size() > 0){
			resultInfo.put("SOP_01", list);
		}else{
			resultInfo.put("SOP_01", new ArrayList());
		}
		
		return resultInfo.toString();
	}

	public String deleteSOP(String jsonString) {
		JSONArray deleteInfo = JSONArray.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String deleteSql = " DELETE FROM SOP WHERE SP001=:SP001 AND SP002=:SP002 ";
		try {
			for(int i = 0; i < deleteInfo.size(); i++){
				JSONObject record = deleteInfo.getJSONObject(i);
				conm.sqlUpdate(deleteSql, record);
			}
			resultInfo.put("result", "success");
		} catch (Exception e) {
			resultInfo.put("result", "failure");
			e.printStackTrace();
		}
		return resultInfo.toString();
	}

	public void saveSOP(String jsonString) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONArray saveInfo = JSONArray.fromObject(jsonString);
		String insertSql = getInsertSql();
		String updateSql = getUpdateSql();
		for(int i = 0; i < saveInfo.size(); i++){
			JSONObject record = saveInfo.getJSONObject(i);
			record.put("DATE", sdf.format(new Date()));
			if(record.getString("exist").equals("Y")){
				conm.sqlUpdate(updateSql, record);
			}else{
				conm.sqlUpdate(insertSql, record);
			}
		}
	}

	private String getInsertSql(){
		String insertSql = "" 
				+"INSERT INTO SOP  " 
				+"        (  " 
				+"                CREATER    ,  " 
				+"                CREATE_DATE,  " 
				+"                MODEIFIER  ,  " 
				+"                MODI_DATE  ,  " 
				+"                FLAG       ,  " 
				+"                SP001      ,  " 
				+"                SP002      ,  " 
				+"                SP003      ,  " 
				+"                SP004      ,  " 
				+"                SP005      ,  " 
				+"                SP006      ,  " 
				+"                SP007      ,  " 
				+"                SP008      ,  " 
				+"                SP009      ,  " 
				+"                SP010  " 
				+"        )  " 
				+"        VALUES  " 
				+"        (  " 
				+"                :USERID     ,  " 
				+"                :DATE,  " 
				+"                :USERID     ,  " 
				+"                :DATE  ,  " 
				+"                0           ,  " 
				+"                :SP001      ,  " 
				+"                :SP002      ,  " 
				+"                :SP003      ,  " 
				+"                :SP004      ,  " 
				+"                :SP005      ,  " 
				+"                :SP006      ,  " 
				+"                :SP007      ,  " 
				+"                :SP008      ,  " 
				+"                :SP009      ,  " 
				+"                :SP010  " 
				+"        )";
		return insertSql;
	}
	
	private String getUpdateSql(){
		String updateSql = "" 
					+"UPDATE  " 
					+"        SOP  " 
					+"SET     MODEIFIER=:USERID   ,  " 
					+"        MODI_DATE=:DATE     ,  " 
					+"        FLAG     =FLAG+1    ,  " 
					+"        SP003    =:SP003    ,  " 
					+"        SP004    =:SP004    ,  " 
					+"        SP005    =:SP005    ,  " 
					+"        SP006    =:SP006    ,  " 
					+"        SP007    =:SP007    ,  " 
					+"        SP008    =:SP008    ,  " 
					+"        SP009    =:SP009    ,  " 
					+"        SP010    =:SP010  " 
					+"WHERE   SP001    =:SP001  " 
					+"        AND SP002=:SP002";
		return updateSql;
	}

	public String exportSOP(String jsonString) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		JSONArray exportInfo = JSONArray.fromObject(jsonString);
		String fileName = "SOP_EXPORT_"+formatter.format(new Date())+".xls";
		String filePath=System.getProperty("eSOP.root")+fileName; 
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet("匯出資料");
		sheet.autoSizeColumn(0);
		//組表頭
		HSSFRow header = sheet.createRow(0);
		header.createCell(0).setCellValue("實體檔案");
		header.createCell(1).setCellValue("檔案日期");
		header.createCell(2).setCellValue("編號");
		header.createCell(3).setCellValue("版號");
		header.createCell(4).setCellValue("說明");
		header.createCell(5).setCellValue("品號");
		header.createCell(6).setCellValue("工序");
		header.createCell(7).setCellValue("作業");
		header.createCell(8).setCellValue("順序");
		header.createCell(9).setCellValue("廠區");
		//組資料
		for(int i = 0; i < exportInfo.size(); i++) {
			JSONObject record = exportInfo.getJSONObject(i);
			HSSFRow rowContent = sheet.createRow(i + 1); 
			rowContent.createCell(0).setCellValue(record.getString("SP003"));
			rowContent.createCell(1).setCellValue(record.getString("SP010"));
			rowContent.createCell(2).setCellValue(record.getString("SP001"));
			rowContent.createCell(3).setCellValue(record.getString("SP002"));
			rowContent.createCell(4).setCellValue(record.getString("SP004"));
			rowContent.createCell(5).setCellValue(record.getString("SP005"));
			rowContent.createCell(6).setCellValue(record.getString("SP007"));
			rowContent.createCell(7).setCellValue(record.getString("SP006"));
			rowContent.createCell(8).setCellValue(record.getString("SP008"));
			rowContent.createCell(9).setCellValue(record.getString("SP009"));
	    }
		
		try{
			FileOutputStream fOut = new FileOutputStream(filePath);
			workbook.write(fOut);
			fOut.flush(); 
			fOut.close();
		}catch (Exception e){
			e.printStackTrace();
		}
		
		return fileName;
	}
	
	public String importFile(String fileName, File uploadFile){
		Workbook readWorkbook = null;
		Sheet sheet = null;
		Row row = null;
		
		JSONObject resultObj= new JSONObject();		JSONArray records = new JSONArray();
		
		try{
			String checkSql = SqlFile.getCheckSqlFile("SOP", "01");
			FileInputStream fis = new FileInputStream(uploadFile);
			if(uploadFile.getPath().substring(uploadFile.getPath().lastIndexOf(".")).toLowerCase().equals(".xlsx")){
				readWorkbook = new XSSFWorkbook(fis);
				sheet = readWorkbook.getSheetAt(0);
				int rNo = sheet.getPhysicalNumberOfRows(); //取得列總數
				for(int i = 1; i < rNo; i++) {
					JSONObject record = new JSONObject();
					row = (XSSFRow)sheet.getRow(i);//先取出列
					
					record.put("SP001",getCellValue(row,2));
					record.put("SP002",getCellValue(row,3));
					record.put("SP003",getCellValue(row,0));
					record.put("SP004",getCellValue(row,4));
					record.put("SP005",getCellValue(row,5));
					record.put("SP006",getCellValue(row,7));
					record.put("SP007",getCellValue(row,6));
					record.put("SP008",getCellValue(row,8));
					record.put("SP009",getCellValue(row,9));
					record.put("SP010",getCellValue(row,1));
						
					if(conm.queryForSingleInteger(checkSql, record) > 0){
						record.put("exist","Y");
					}
					
					records.add(record);
				}
				fis.close();
			}else if(uploadFile.getPath().substring(uploadFile.getPath().lastIndexOf(".")).toLowerCase().equals(".xls")){
				readWorkbook = new HSSFWorkbook(fis);
				sheet = readWorkbook.getSheetAt(0);
				int rNo = sheet.getPhysicalNumberOfRows(); //取得列總數
				for(int i = 1; i < rNo; i++) {
					JSONObject record = new JSONObject();
					row = (HSSFRow)sheet.getRow(i);//先取出列
					
					record.put("SP001",getCellValue(row,2));
					record.put("SP002",getCellValue(row,3));
					record.put("SP003",getCellValue(row,0));
					record.put("SP004",getCellValue(row,4));
					record.put("SP005",getCellValue(row,5));
					record.put("SP006",getCellValue(row,7));
					record.put("SP007",getCellValue(row,6));
					record.put("SP008",getCellValue(row,8));
					record.put("SP009",getCellValue(row,9));
					record.put("SP010",getCellValue(row,1));
						
					if(conm.queryForSingleInteger(checkSql, record) > 0){
						record.put("exist","Y");
					}
					
					records.add(record);
				}
				fis.close();
			}else{
				throw new Exception("資料格式不符，請重新選取！");
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
		resultObj.put("eSOP", records);
		
		return resultObj.toString();
	}
	
	private String getCellValue(Row row, int cell_index){
		String value = "";
		if(row.getCell(cell_index) == null){
			value = "";
		}else{
			if(row.getCell(cell_index).getCellType() == Cell.CELL_TYPE_NUMERIC){
				if(cell_index == 6){//處理工序補0
					value = String.format("%04d", ((int)row.getCell(cell_index).getNumericCellValue()));
				}else{
					value = String.valueOf((int)row.getCell(cell_index).getNumericCellValue());
				}
			}else{
				value = row.getCell(cell_index).getRichStringCellValue().getString();
			}
		}
		return value;
	}

	public String getVersionList(String jsonString) {
		JSONObject queryInfo = JSONObject.fromObject(jsonString);
		JSONObject resultInfo = new JSONObject();
		String querySql = " SELECT SP002 FROM SOP WHERE SP001=:SS003 ORDER BY SP002 DESC ";
		
		List list = conm.queryForList(querySql, queryInfo);
		if(list.size() > 0){
			resultInfo.put("result", "success");
			resultInfo.put("record", list);
		}else{
			resultInfo.put("result", "failure");
		}
		return resultInfo.toString();
	}
}
