package com.dci.esop.register;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;

public class Machine {
	protected String getWMIValue(String wmiQueryStr,String wmiCommaSeparatedFieldName){
		 String result = "";
		    try {
		      File file = File.createTempFile("realhowto",".vbs");
		      file.deleteOnExit();
		      String vbs="";
		      FileWriter fw = new java.io.FileWriter(file);
		      vbs =
		    	         "Set objWMIService = GetObject(\"winmgmts:\\\\.\\root\\cimv2\")\n"
		    	        + "Set colItems = objWMIService.ExecQuery _ \n"
		    	        + "   (\""+wmiQueryStr+"\") \n"
		    	        + "For Each objItem in colItems \n"
		    	        + "    Wscript.Echo objItem."+wmiCommaSeparatedFieldName+" \n"
		    	        + "Next \n";
		      
		      fw.write(vbs);
		      fw.close();
		      Process p = Runtime.getRuntime().exec("cscript //NoLogo " + file.getPath());
		      BufferedReader input = new BufferedReader(new InputStreamReader(p.getInputStream()));
		      String line;
		      while ((line = input.readLine()) != null) {
		         result += line;
		      }
		      input.close();
		    }
		    catch(Exception e){
		        e.printStackTrace();
		    }
		    return result.trim();
	}
}
