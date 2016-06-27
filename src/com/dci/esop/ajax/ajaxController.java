package com.dci.esop.ajax;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import net.sf.json.JSONObject;

@Path("/ajax")
public class ajaxController {
	@POST
	@Path("/helloPost")
	public String sayHelloPost(@FormParam("data") String jsonObj) {
		JSONObject jsonObject = JSONObject.fromObject(jsonObj);
		return "Hello, " + jsonObject.getString("name");
	}
}
