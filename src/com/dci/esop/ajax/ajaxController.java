package com.dci.esop.ajax;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import com.dci.esop.authentication.Station;
import com.dci.esop.authentication.UserCheck;
import com.dci.esop.dao.CONFIG;
import com.dci.esop.register.HardwareEncrypt;
import com.dci.esop.sql.ConnectionManager;
import com.dci.esop.util.Config;
import com.digwin.cross.exception.IllegalDataException;
import com.digwin.cross.util.CodeUtil;

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
	public String sayHelloPost(@FormParam("data") String jsonObj) throws UnsupportedEncodingException, IllegalDataException {
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
	public String getMachineNumberByGuardService(@PathParam("ip") String ip, @PathParam("apip") String apip) {
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
	
	@POST
	@Path("/userCheck")
	public String userCheck(@FormParam("data") String jsonObj) {
		UserCheck UserCheck = new UserCheck();
		return UserCheck.loginProcess(jsonObj);
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
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFile(
		@FormDataParam("file") InputStream uploadedInputStream,
		@FormDataParam("file") FormDataContentDisposition fileDetail) {

		System.out.println(fileDetail.getFileName());
		String uploadedFileLocation = "D://" + fileDetail.getFileName();

		// save it
		writeToFile(uploadedInputStream, uploadedFileLocation);

		String output = "File uploaded to : " + uploadedFileLocation;

		return Response.status(200).entity(output).build();

	}

	// save uploaded file to new location
	private void writeToFile(InputStream uploadedInputStream,
		String uploadedFileLocation) {

		try {
			OutputStream out = new FileOutputStream(new File(
					uploadedFileLocation));
			int read = 0;
			byte[] bytes = new byte[1024];

			out = new FileOutputStream(new File(uploadedFileLocation));
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			out.close();
		} catch (IOException e) {

			e.printStackTrace();
		}

	}

}
