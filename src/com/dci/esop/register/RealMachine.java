package com.dci.esop.register;

import org.apache.commons.codec.binary.Base64;

public class RealMachine extends Machine{
	protected String getMachineSerialByHDD() {
		String result="";
		try {
			result = getWMIValue("Select * from Win32_LogicalDisk where DeviceID='C:'", "VolumeSerialNumber");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
	public String encode_to_32char()
	{
		String Machine_str = getMachineSerialByHDD();
		String Machine_strII="";
		Machine_strII=Machine_str+Machine_str+Machine_str;
		byte[] encoded = Base64.encodeBase64(Machine_strII.getBytes());   
		return new String(encoded);
	}
}
