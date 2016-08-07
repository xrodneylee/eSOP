package com.dci.esop.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.Properties;

import net.sf.json.JSONObject;

public class Config extends Properties{
	private static final long serialVersionUID = 2509826808934185629L;
	private static Config instance = null;
	private static String eSOP_Home=System.getenv("eSOP_HOME");
	
	public static Config getInstance(){
		if (instance == null) {
			instance = new Config();
			try {
				if(eSOP_Home == null)eSOP_Home = new File(".").getAbsolutePath();
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
	
	public String getConfigBatch(){
		JSONObject result = new JSONObject();
		Iterator<?> keys = instance.keySet().iterator();
		while(keys.hasNext()){
			String key = (String)keys.next();
			result.put(key,instance.getProperty(key));
		}
		return result.toString();
	}
	
	public void setConfig(String key,String value) throws FileNotFoundException, IOException {
		instance.setProperty(key, value);
		propertiesSave();
	}
	
	public String setConfigBatch(String jsonString){
		JSONObject json = JSONObject.fromObject(jsonString);
		JSONObject result = new JSONObject();
		Iterator<?> keys = json.keys();
		while(keys.hasNext()){
			String key = (String)keys.next();
			instance.setProperty(key,json.getString(key));
		}
		try {
			propertiesSave();
			result.put("result", "success");
		} catch (Exception e) {
			result.put("result", "failure");
			result.put("msg", e.getMessage());
			e.printStackTrace();
		}
		return result.toString();
	}
	
	private void propertiesSave() throws FileNotFoundException, IOException{
		instance.store(new FileOutputStream(eSOP_Home+"/database.conf.properties"), "store");
	}
}
