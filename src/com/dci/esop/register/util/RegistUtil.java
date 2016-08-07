package com.dci.esop.register.util;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class RegistUtil {
	
	public static BigInteger parseString2BigInteger(String radixText, int radix){
		BigInteger b=new BigInteger(radixText,radix);
		return b;
	}
	public static String parseBigInteger2String(BigInteger decimal, int radix){
		return decimal.toString(radix);
	}
	
	public static Long parseString2Long(String radixText, int radix){
		return Long.parseLong(radixText,radix);
	}
	
	public static String parseLong2String(long decimal, int radix){
		return Long.toString(decimal, radix).toUpperCase();
	}
	
	public static int parseString2Num(String radixText, int radix){
		return Integer.parseInt(radixText,radix);
	}
	
	public static String parseNum2String(int decimal, int radix){
		return Integer.toString(decimal, radix).toUpperCase();
	}
	
	public static String[] string2Array(String s){
		return s.split("(?!^)");
	}
	 
	public static int ArraysSearch(String[] strs,String key){
		for(int i=0;i<strs.length;i++){
			if(key.equals(strs[i]))
				return i;
		}
		return -1;
	}
	
	public static String ArraysToString(String[] cryptoResult){
		String res="";
		for(String s:cryptoResult){
			res += s;
		}
		return res;
	}
	
	public static String serial2StringFormat(String serial){
		String s=serial.substring(0,3);
		s=rightPad(s,27,'*');
		s+=serial.substring(27);
		return s;
	}
	
	public static String leftPad(String s, int width,char c) {
	    return String.format("%" + width + "s", s).replace(' ', c);
	}

	public static String rightPad(String s, int width,char c) {
	    return String.format("%-" + width + "s", s).replace(' ', c);
	}
	    
	public static String int2DateString(int i){
	    String s="";
		SimpleDateFormat int2DateFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
		try {
		   s = formatter2.format(int2DateFormat.parse(""+i));
		} catch (ParseException e) {
		   e.printStackTrace();
		}
		return s;
	}
	
	public static String int2DateString(int i,int addDay){
	    String s="";
		SimpleDateFormat int2DateFormat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Calendar c = Calendar.getInstance(); 
			c.setTime(int2DateFormat.parse(""+i)); 
			c.add(Calendar.DATE, addDay);
			
		   s = formatter2.format(c.getTime());
		} catch (ParseException e) {
		   e.printStackTrace();
		}
		return s;
	}
	
	public static int string2DataInt(String s){
		int i=0;
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		try {
			i=date2Int(formatter.parse(s));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return i;
	}
	
	public static int date2Int(Date d){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		String ret = formatter.format(d);
		return Integer.valueOf(ret);
	}
	
	public static int sysDate2Int(){
		Date d = new Date();
		return date2Int(d);
	}
	
	public static Date string2DataObj(String s){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		Date dateObj=null;
		try {
			dateObj = formatter.parse(s);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return dateObj;
	}
	public static Date int2DataObj(int d){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		Date dateObj=null;
		try {
			dateObj = formatter.parse(String.valueOf(d));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return dateObj;
	}
	
	public static Long passDayCal(Date d1,Date d2){
		return (d1.getTime()-d2.getTime())/(1000*3600*24);
	}
	
	public static Long passDayCalWithNow(Date d){
		return ((new Date()).getTime()-d.getTime())/(1000*3600*24);
	}
	public static Long passDayCalWithNow(int d){
		return ((new Date()).getTime()-int2DataObj(d).getTime())/(1000*3600*24);
	}

	public static void main(String[] args) {
		System.out.println(leftPad("csccc",8,'0'));
	}
}
