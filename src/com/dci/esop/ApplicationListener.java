package com.dci.esop;


import java.io.File;
import java.util.Arrays;
import java.util.Comparator;

import javax.servlet.ServletContextEvent;  

import org.springframework.web.context.ContextLoaderListener;

public class ApplicationListener extends ContextLoaderListener {  

	public void contextDestroyed(ServletContextEvent sce) {
	}  

	public void contextInitialized(ServletContextEvent sce) {
			String webAppRootKey = sce.getServletContext().getRealPath("/");
			System.setProperty("eSOP.root" , webAppRootKey);
	}  
}  