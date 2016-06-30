package com.dci.esop.ajax;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import com.dci.esop.authentication.UserCheck;
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
	
	@POST
	@Path("/userCheck")
	public String userCheck(@FormParam("data") String jsonObj) {
		UserCheck UserCheck = new UserCheck();
		return UserCheck.loginProcess(jsonObj);
	}
	
	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFile(
		@FormDataParam("file") InputStream uploadedInputStream,
		@FormDataParam("file") FormDataContentDisposition fileDetail) {

		System.out.println(fileDetail.getFileName());
		System.out.println(fileDetail.getName());
		String uploadedFileLocation = "d://" + fileDetail.getFileName();

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
