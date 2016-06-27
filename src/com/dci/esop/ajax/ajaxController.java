package com.dci.esop.ajax;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

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
	public String sayHelloPost(@FormParam("data") String jsonObj) {
		JSONObject jsonObject = JSONObject.fromObject(jsonObj);
		return "Hello, " + jsonObject.getString("USER");
	}
}
