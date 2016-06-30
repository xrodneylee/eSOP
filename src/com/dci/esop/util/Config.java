package com.dci.esop.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class Config extends Properties{
	private static final long serialVersionUID = 2509826808934185629L;
	private static Config instance = null;
	private static String eSOP_Home=new File(".").getAbsolutePath();
	
	public static Config getInstance(){
		if (instance == null) {
			instance = new Config();
			try {
				instance.load(new FileInputStream(eSOP_Home+"/database.conf.properties"));
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return instance;
	}
	
	private Config() {
		
	}
	
	public String getConfig(String key) {
		return instance.getProperty(key);
	}
	
	public void setConfig(String key,String value) throws FileNotFoundException, IOException {
		instance.setProperty(key, value);
		instance.store(new FileOutputStream(eSOP_Home+"/database.conf.properties"), "store");
	}
}
