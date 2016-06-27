package com.dci.esop;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;


@ApplicationPath("/api")
public class ajaxApplication extends ResourceConfig{
    public ajaxApplication(){
        packages("com.dci.esop.ajax");
    }
}
