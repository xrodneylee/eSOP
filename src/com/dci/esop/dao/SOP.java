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
		Cell c = null;
		
		
		JSONObject resultObj= new JSONObject();		JSONArray records = new JSONArray();
		
		try{
			FileInputStream fis = new FileInputStream(uploadFile);
			if(uploadFile.getPath().substring(uploadFile.getPath().lastIndexOf(".")).toLowerCase().equals(".xlsx")){
//				readWorkbook = new XSSFWorkbook (fis);
//				int sNo = readWorkbook.getNumberOfSheets();	//該檔案中有幾個sheet(幾個箱號)
//				if(sNo > 50) throw new Exception("Excel Sheet最多為50頁！");
//				for(int i = 0; i < sNo; i++){	//走訪所有sheet
//					JSONObject sheetObj = new JSONObject();
//					JSONArray BoxNoLINEAry = new JSONArray();
//					sheet = readWorkbook.getSheetAt(i);
//					sheetObj.put("BoxNo",sheet.getSheetName());
//					int rNo = sheet.getPhysicalNumberOfRows(); //取得列總數
//					List colName = new ArrayList();
//					for(int j = 0; j < rNo; j++) {
//						JSONObject rowObj = new JSONObject();
//						row = (XSSFRow)sheet.getRow(j);//先取出列
//						int cNo = 4; //確認只有4個欄位，LotNo、SN、DATE、USER
//						for(int k = 0; k < cNo; k++){
//							if(j == 0){
//								colName.add(row.getCell(k).toString());
//								if(!row.getCell(0).toString().equals("LotNo"))throw new Exception("資料格式不符，請檢視欄位是否符合規格！");
//								if(!row.getCell(1).toString().equals("SN"))throw new Exception("資料格式不符，請檢視欄位是否符合規格！");
//								if(!row.getCell(2).toString().equals("DATE"))throw new Exception("資料格式不符，請檢視欄位是否符合規格！");
//								if(!row.getCell(3).toString().equals("USER"))throw new Exception("資料格式不符，請檢視欄位是否符合規格！");
//							}else{
//								rowObj.put(colName.get(k),row.getCell(k).toString());
//							}
//						}
//						if(j > 0)
//							BoxNoLINEAry.add(rowObj);
//					}
//					sheetObj.put("BoxNoLINE",BoxNoLINEAry);
//					ExcelAry.add(sheetObj);
//				}
//				System.out.println(ExcelAry.toString());
			
			}else if(uploadFile.getPath().substring(uploadFile.getPath().lastIndexOf(".")).toLowerCase().equals(".xls")){
				readWorkbook = new HSSFWorkbook(fis);
				sheet = readWorkbook.getSheetAt(0);
				int rNo = sheet.getPhysicalNumberOfRows(); //取得列總數
				for(int i = 1; i < rNo; i++) {
					JSONObject record = new JSONObject();
					row = (HSSFRow)sheet.getRow(i);//先取出列
					int cNo = 10; //確認只有10個欄位
					for(int j = 0; j < cNo; j++){
						if(row.getCell(2).getStringCellValue() == null){
							record.put("SP001","");
						}else{
							record.put("SP001",row.getCell(2).getStringCellValue());
						}
						if(row.getCell(3).getStringCellValue() == null){
							record.put("SP002","");
						}else{
							record.put("SP002",row.getCell(3).getStringCellValue());
						}
						if(row.getCell(0).getStringCellValue() == null){
							record.put("SP003","");
						}else{
							record.put("SP003",row.getCell(0).getStringCellValue());
						}
						if(row.getCell(4).getStringCellValue() == null){
							record.put("SP004","");
						}else{
							record.put("SP004",row.getCell(4).getStringCellValue());
						}
						if(row.getCell(5).getStringCellValue() == null){
							record.put("SP005","");
						}else{
							record.put("SP005",row.getCell(5).getStringCellValue());
						}
						if(row.getCell(7).getStringCellValue() == null){
							record.put("SP006","");
						}else{
							record.put("SP006",row.getCell(7).getStringCellValue());
						}
						record.put("SP007",row.getCell(6).getNumericCellValue());
						record.put("SP008",row.getCell(8).getNumericCellValue());
						if(row.getCell(9).getStringCellValue() == null){
							record.put("SP009","");
						}else{
							record.put("SP009",row.getCell(9).getStringCellValue());
						}
						if(row.getCell(1).getStringCellValue() == null){
							record.put("SP010","");
						}else{
							record.put("SP010",row.getCell(1).getStringCellValue());
						}
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
}
