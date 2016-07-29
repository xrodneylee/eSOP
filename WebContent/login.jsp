<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.dci.esop.sql.ConnectionManager" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>eSOP登入首頁</title>

<link rel="stylesheet" type="text/css" href="sources/extjs/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="sources/css/eSOP.css">
<script type="text/javascript" src="sources/extjs/ext-all.js"></script>
<script type="text/javascript" src="sources/extjs/locale/ext-lang-zh_TW.js"></script>

<script type="text/javascript" src="login/login.js"></script>

<% 
try{
	ConnectionManager conm = new ConnectionManager();
	conm.queryForSingleInteger(" SELECT 1 ", null);
}catch(Exception e){
	//導向設定頁面
	response.sendRedirect("InitSet.jsp");
}
%>

</head>
<body>
	
</body>
</html>