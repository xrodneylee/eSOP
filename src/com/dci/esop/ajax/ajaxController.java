package com.dci.esop.ajax;

import java.io.UnsupportedEncodingException;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

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
}
