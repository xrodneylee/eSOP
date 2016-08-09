<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.dci.esop.dao.CONFIG"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<%
CONFIG CONFIG = new CONFIG();
String fileName =  new String(request.getParameter("fileName").getBytes("ISO8859-1"), "UTF-8");
String FileServer= CONFIG.getESOPFileRoute();
FileServer=FileServer+fileName;
response.setContentType("application/pdf");
response.setHeader("Content-disposition", "inline; filename="+fileName); 
ServletOutputStream sOS = response.getOutputStream(); 
try
   {
		java.io.File fileToDownload = new java.io.File(FileServer);
    	response.setContentLength((int)fileToDownload.length()); 
    	java.io.FileInputStream fileInputStream = new java.io.FileInputStream(fileToDownload);
      	int i = 0;
      	while ((i = fileInputStream.read()) != -1) {
        	sOS.write( i );
       	}
      	fileInputStream.close();
   }
catch(Exception e)
	{
	}
sOS.flush(); 
sOS.close(); 
out.clear(); 
out = pageContext.pushBody(); 

%> 

</head>
<body>

</body>
</html>