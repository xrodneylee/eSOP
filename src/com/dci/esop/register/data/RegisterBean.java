package com.dci.esop.register.data;

import java.io.Serializable;

public class RegisterBean implements Serializable{

	private static final long serialVersionUID = 1L;
	public String getSerial() {
		return serial;
	}
	public void setSerial(String serial) {
		this.serial = serial;
	}
	public String getExecCode() {
		return execCode;
	}
	public void setExecCode(String execCode) {
		this.execCode = execCode;
	}
	public String getFailDate() {
		return failDate;
	}
	public void setFailDate(String failDate) {
		this.failDate = failDate;
	}
	private String serial;
	private String execCode;
	private String failDate;
	public RegisterBean(){
		serial="";
		execCode="";
		failDate="";
	}
}
