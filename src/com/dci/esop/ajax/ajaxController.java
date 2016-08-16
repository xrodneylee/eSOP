package com.dci.esop.ajax;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.glassfish.jersey.media.multipart.FormDataParam;

import com.dci.esop.authentication.Station;
import com.dci.esop.authentication.UserCheck;
import com.dci.esop.dao.ATTRIBUTE_LIST;
import com.dci.esop.dao.CONFIG;
import com.dci.esop.dao.ONLINE_USER_RECORD;
import com.dci.esop.dao.PRINCIPAL;
import com.dci.esop.dao.SOP;
import com.dci.esop.dao.STATION;
import com.dci.esop.dao.STATION_HISTORY;
import com.dci.esop.dao.STATION_SOP;
import com.dci.esop.register.CryptoManager;
import com.dci.esop.register.HardwareEncrypt;
import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.util.Config;
import com.dci.esop.util.PDFToImg;
import com.digwin.cross.exception.IllegalDataException;

import net.sf.json.JSONObject;

@Path("/ajax")
public class ajaxController {
	@GET
	@Produces("text/plain")
	public String sayHelloWorld() {
		return "Hello world";
	}

	@POST
	@Path("/hello")
	public String sayHelloPost(@FormParam("data") String jsonObj)
			throws UnsupportedEncodingException, IllegalDataException {
		JSONObject jsonObject = JSONObject.fromObject(jsonObj);
		return "Hello, " + jsonObject.getString("AUTH_ID");
	}

	@GET
	@Produces({ "text/plain" })
	@Path("getMachineNumber")
	public String getMachineNumber() {
		HardwareEncrypt enHardware = HardwareEncrypt.getInstance();
		String machineNumber = null;
		try {
			machineNumber = enHardware.encrypt();
		} catch (UnknownHostException e) {
			machineNumber = "GuardService";
		} catch (IOException e) {
			machineNumber = "GuardService";
		}

		return machineNumber;
	}

	@GET
	@Produces({ "text/plain" })
	@Path("getMachineNumber/{ip}/{apip}")
	public String getMachineNumberByGuardService(@PathParam("ip") String ip,
			@PathParam("apip") String apip) {
		HardwareEncrypt enHardware = HardwareEncrypt.getInstance();
		String machineNumber = null;
		try {
			enHardware.setHARDWAREID(null);
			machineNumber = enHardware.encrypt(ip, apip);
		} catch (UnknownHostException e) {
			machineNumber = "GuardService";
		} catch (IOException e) {
			machineNumber = "GuardService";
		}
		return machineNumber;
	}

	@GET
	@Path("/getMaxUser")
	public int getMaxUser() {
		UserCheck UserCheck = new UserCheck();
		return UserCheck.getOnlineMaxUser();
	}
	
	@POST
	@Path("/userCheck")
	public String userCheck(@FormParam("data") String jsonObj) {
		UserCheck UserCheck = new UserCheck();
		return UserCheck.loginProcess(jsonObj);
	}
	
	@POST
	@Path("/logout")
	public void logout(@FormParam("data") String jsonObj) {
		UserCheck UserCheck = new UserCheck();
		UserCheck.logout(jsonObj);
	}

	@GET
	@Path("/getONLINE_USER_RECORD")
	public String getONLINE_USER_RECORD() {
		ONLINE_USER_RECORD ONLINE_USER_RECORD = new ONLINE_USER_RECORD();
		return ONLINE_USER_RECORD.getONLINE_USER_RECORD();
	}
	
	@POST
	@Path("/delete_ONLINE_USER_RECORD")
	public void delete_ONLINE_USER_RECORD(@FormParam("data") String jsonObj) {
		ONLINE_USER_RECORD ONLINE_USER_RECORD = new ONLINE_USER_RECORD();
		ONLINE_USER_RECORD.delete_ONLINE_USER_RECORD(jsonObj);
	}
	
	@GET
	@Path("/getUserCount")
	public String getUserCount() {
		ONLINE_USER_RECORD ONLINE_USER_RECORD = new ONLINE_USER_RECORD();
		return ONLINE_USER_RECORD.getUserCount();
	}
	
	@POST
	@Path("/stationCheck")
	public String stationCheck(@FormParam("data") String jsonObj) {
		Station station = new Station();
		return station.stationCheck(jsonObj);
	}

	@POST
	@Path("/isValid")
	public String isValid(@FormParam("data") String jsonObj) {
		Station station = new Station();
		return station.isValid(jsonObj);
	}

	@POST
	@Path("/getStationInit")
	public String getStationInit(@FormParam("data") String jsonObj) {
		Station station = new Station();
		return station.getStationInit(jsonObj);
	}

	@POST
	@Path("/getStationKanban")
	public String getStationKanban(@FormParam("data") String jsonObj) {
		Station station = new Station();
		return station.getStationKanban(jsonObj);
	}

	@POST
	@Path("/register")
	public String register(@FormParam("data") String jsonObj) {
		Station station = new Station();
		return station.register(jsonObj);
	}

	@POST
	@Path("/saveDataSource")
	public String saveDataSource(@FormParam("data") String jsonObj) {
		Config config = Config.getInstance();
		return config.setConfigBatch(jsonObj);
	}

	@POST
	@Path("/getInitData")
	public String getInitData() {
		Config config = Config.getInstance();
		return config.getConfigBatch();
	}

	@GET
	@Path("/getConfigData/{cd006}")
	public String getConfigData(@PathParam("cd006") String cd006) {
		CONFIG CONFIG = new CONFIG();
		return CONFIG.getConfigData(cd006);
	}

	@POST
	@Path("/saveConfigData")
	public void saveConfigData(@FormParam("data") String jsonObj) {
		CONFIG CONFIG = new CONFIG();
		CONFIG.saveConfigData(jsonObj);
	}

	@POST
	@Path("/connectionTest")
	public String connectionTest() {
		ConnectionManager conm = new ConnectionManager();
		return conm.queryForSingleString(" SELECT '1' ", null);
	}

	@POST
	@Path("/getATTRIBUTE_LIST01")
	public String getATTRIBUTE_LIST01(@FormParam("data") String jsonObj) {
		ATTRIBUTE_LIST ATTRIBUTE_LIST = new ATTRIBUTE_LIST();
		return ATTRIBUTE_LIST.getATTRIBUTE_LIST01(jsonObj);
	}

	@POST
	@Path("/getSOP01")
	public String getSOP01(@FormParam("data") String jsonObj) {
		SOP SOP = new SOP();
		return SOP.getSOP01(jsonObj);
	}

	@POST
	@Path("/getSOP_query")
	public String getSOP_query(@FormParam("data") String jsonObj) {
		SOP SOP = new SOP();
		return SOP.getSOP_query(jsonObj);
	}

	@GET
	@Path("/getPRINCIPAL_all")
	public String getPRINCIPAL_all() {
		PRINCIPAL PRINCIPAL = new PRINCIPAL();
		return PRINCIPAL.getPRINCIPAL_all();
	}

	@POST
	@Path("/getPRINCIPAL_search")
	public String getPRINCIPAL_search(@FormParam("data") String jsonObj) {
		PRINCIPAL PRINCIPAL = new PRINCIPAL();
		return PRINCIPAL.getPRINCIPAL_search(jsonObj);
	}

	@POST
	@Path("/deleteUser_PRINCIPAL")
	public String deleteUser_PRINCIPAL(@FormParam("data") String jsonObj) {
		PRINCIPAL PRINCIPAL = new PRINCIPAL();
		return PRINCIPAL.deleteUser(jsonObj);
	}

	@POST
	@Path("/saveUser_PRINCIPAL")
	public String saveUser_PRINCIPAL(@FormParam("data") String jsonObj) {
		PRINCIPAL PRINCIPAL = new PRINCIPAL();
		return PRINCIPAL.saveUser(jsonObj);
	}

	@GET
	@Path("/getSTATION_all")
	public String getSTATION_all() {
		STATION STATION = new STATION();
		return STATION.getSTATION_all();
	}

	@POST
	@Path("/getSTATION_search")
	public String getSTATION_search(@FormParam("data") String jsonObj) {
		STATION STATION = new STATION();
		return STATION.getSTATION_search(jsonObj);
	}

	@POST
	@Path("/deleteUser_STATION")
	public String deleteUser_STATION(@FormParam("data") String jsonObj) {
		STATION STATION = new STATION();
		return STATION.deleteUser(jsonObj);
	}

	@POST
	@Path("/saveUser_STATION")
	public String saveUser_STATION(@FormParam("data") String jsonObj) {
		STATION STATION = new STATION();
		return STATION.saveUser(jsonObj);
	}
	
	@POST
	@Path("/update_ST009_ST010")
	public String update_ST009_ST010(@FormParam("data") String jsonObj) {
		STATION STATION = new STATION();
		return STATION.update_ST009_ST010(jsonObj);
	}
	
	@POST
	@Path("/doReload")
	public String doReload(@FormParam("data") String jsonObj) {
		STATION STATION = new STATION();
		return STATION.doReload(jsonObj);
	}

	@POST
	@Path("/getST011")
	public String getST011(@FormParam("data") String jsonObj) {
		STATION STATION = new STATION();
		return STATION.getST011(jsonObj);
	}
	
	@POST
	@Path("/deleteSOP")
	public String deleteSOP(@FormParam("data") String jsonObj) {
		SOP SOP = new SOP();
		return SOP.deleteSOP(jsonObj);
	}

	@POST
	@Path("/saveSOP")
	public String saveSOP(@FormParam("data") String jsonObj) {
		SOP SOP = new SOP();
		return SOP.saveSOP(jsonObj);
	}
	
	@POST
	@Path("/exportSOP")
	public String exportSOP(@FormParam("data") String jsonObj) {
		SOP SOP = new SOP();
		return SOP.exportSOP(jsonObj);
	}
	
	@POST
	@Path("/getVersionList")
	public String getVersionList(@FormParam("data") String jsonObj) {
		SOP SOP = new SOP();
		return SOP.getVersionList(jsonObj);
	}
	
	@POST
	@Path("/getChoiceList_standard")
	public String getChoiceList_standard(@FormParam("data") String jsonObj) {
		STATION_SOP STATION_SOP = new STATION_SOP();
		return STATION_SOP.getChoiceList(jsonObj);
	}
	
	@POST
	@Path("/getChoiceList_history")
	public String getChoiceList_history(@FormParam("data") String jsonObj) {
		STATION_HISTORY STATION_HISTORY = new STATION_HISTORY();
		return STATION_HISTORY.getChoiceList(jsonObj);
	}
	
	@POST
	@Path("/getSingleVersion_standard")
	public String getSingleVersion_standard(@FormParam("data") String jsonObj) {
		STATION_SOP STATION_SOP = new STATION_SOP();
		return STATION_SOP.getSingleVersion(jsonObj);
	}
	
	@POST
	@Path("/getSingleVersion_history")
	public String getSingleVersion_history(@FormParam("data") String jsonObj) {
		STATION_HISTORY STATION_HISTORY = new STATION_HISTORY();
		return STATION_HISTORY.getSingleVersion(jsonObj);
	}
	
	@POST
	@Path("/insertHistory")
	public String insertHistory(@FormParam("data") String jsonObj) {
		STATION_HISTORY STATION_HISTORY = new STATION_HISTORY();
		return STATION_HISTORY.insertHistory(jsonObj);
	}
	
	@GET    
	@Produces({"text/plain"})
	@Path("/getMoudleInfo")
	public String getMoudleInfo() throws Exception {
		CryptoManager cm = CryptoManager.getInstance();
		return cm.getMoudleInfo();
	}
	
	@GET    
	@Produces({"text/plain"})
	@Path("/getAllSerialInfo")
	public String getAllSerialInfo() throws Exception {
		CryptoManager cm = CryptoManager.getInstance();
		return cm.getSerialInfoDataList();
	}
	
	@GET    
	@Produces({"text/plain"})
	@Path("/getHardwareCode")
	public String getHardwareCode() throws Exception {
		CryptoManager cm = CryptoManager.getInstance();
		return cm.getHardwareCode();
	}
	
	@GET    
	@Produces({"text/plain"})
	@Path("/verifySerial/{serialId}")
	public String verifySerial(@PathParam("serialId")String serialId) throws Exception {
		CryptoManager cm = CryptoManager.getInstance();
		return cm.verifySerial(serialId);
	}
	
	@GET    
	@Produces({"text/plain"})
	@Path("/getComboBoxInfo")
	public String getComboBoxInfo() throws Exception {
		CryptoManager cm = CryptoManager.getInstance();
		return cm.getSerialList();
	}
	
	@POST   
	@Produces({"text/plain"})
	@Path("/verifyExecuteCode") 
	public String verifyExecuteCode(@FormParam("paramData")String jsonObj) throws Exception {
		CryptoManager cm = CryptoManager.getInstance();
		JSONObject jsonObject = JSONObject.fromObject(jsonObj);
		return cm.verifyExecuteCode(jsonObject.getString("serial").toString(),
				jsonObject.getString("hardware").toString(),
				jsonObject.getString("verifyCode").toString());
	}
	
	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public String uploadFile(
			@FormDataParam("file") InputStream uploadedInputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) {

		JSONObject output = new JSONObject();
		CONFIG CONFIG = new CONFIG();
		
		try {
			String eSOPFileServer= CONFIG.getESOPFileRoute();
			String fileName = new String(fileDetail.getFileName().getBytes("ISO8859-1"), "UTF-8");
			String uploadedFileLocation = eSOPFileServer + fileName;
			// save it
			writeToFile(uploadedInputStream, uploadedFileLocation);
			PDFToImg.create(fileName);
			
			output.put("result", "success");
		} catch (Exception e) {
			e.printStackTrace();
			output.put("result", "failure");
		}
		

		return output.toString();

	}

	// save uploaded file to new location
	private void writeToFile(InputStream uploadedInputStream,String uploadedFileLocation) throws IOException {

		OutputStream out = new FileOutputStream(new File(uploadedFileLocation));
		int read = 0;
		byte[] bytes = new byte[1024];

		out = new FileOutputStream(new File(uploadedFileLocation));
		while ((read = uploadedInputStream.read(bytes)) != -1) {
			out.write(bytes, 0, read);
		}
		out.flush();
		out.close();
	}

}
