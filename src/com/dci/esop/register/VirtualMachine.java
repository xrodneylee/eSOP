package com.dci.esop.register;

import java.io.IOException;
import java.net.UnknownHostException;

import com.dci.esop.sql.ConnectionManager;

public class VirtualMachine extends Machine{
	private boolean getVMData() {
		boolean checkResult = false;
		String Win32_ComputerSystem_model="";
		String Win32_ComputerSystem_Manufacturer="";
		String Win32_Processor_Name="";
		try {
			Win32_ComputerSystem_model = getWMIValue("Select Model from Win32_ComputerSystem", "Model");
			Win32_ComputerSystem_Manufacturer = getWMIValue("Select Manufacturer from Win32_ComputerSystem", "Manufacturer");
			Win32_Processor_Name = getWMIValue("Select Name from Win32_Processor", "Name");
		} catch (Exception e) {
			e.printStackTrace();
		}
		if  (Win32_ComputerSystem_model.toLowerCase().contains("virtual")||
				(Win32_ComputerSystem_Manufacturer.toUpperCase().contains("XEN")&& Win32_Processor_Name.toUpperCase().contains("XEN"))){
			checkResult = true;
		}
		return checkResult;
	}
	
	public boolean isVM(){
		return getVMData();
	}
	
	public boolean getVMCertification() throws Exception {
		boolean cerification = false;
		ConnectionManager conm = new ConnectionManager();
		String sql = "SELECT ISNULL(CD003,'') AS CD003 FROM CONFIG WHERE CD001='HardwareKey'";
		String cd003 = conm.queryForSingleString(sql, null);
		String getHardwareKey = getHardwareKey();
		if (getHardwareKey.equals(cd003) && (!getHardwareKey.equals(""))) {
			cerification = true;
		} else {
			cerification = false;
		}
		return cerification;
	}
	
	public String getHardwareKey() throws UnknownHostException, IOException {
		HardwareEncrypt enHardware = HardwareEncrypt.getInstance();
		return enHardware.encrypt();
	}
}
