<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.dci.esop.dao.CONFIG" %>
<%@ page import="java.net.InetAddress" %>
<%@ page import="com.dci.esop.register.VirtualMachine" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String ServerIP="",getGuardManagerNetCard="",getGuardManagerIP="",getGuardManagerPort="",getHardwareKey="";
boolean isVm = false;
try{
	CONFIG CONFIG = new CONFIG();
	VirtualMachine vm = new VirtualMachine();
	InetAddress server = InetAddress.getLocalHost();
	ServerIP = server.getHostAddress().toString();
	isVm = vm.isVM();
	getGuardManagerNetCard = CONFIG.getGuardManagerNetCard();
	getGuardManagerIP = CONFIG.getGuardManagerIP();
	getGuardManagerPort = CONFIG.getGuardManagerPort();
	getHardwareKey = CONFIG.getHardwareKey();
}catch(Exception e){
	response.sendRedirect("/eSOP/databaseInfo/databaseInfo.jsp");
}

%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<link rel="stylesheet" type="text/css" href="../sources/extjs/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="../sources/css/eSOP.css">
<script type="text/javascript" src="../sources/extjs/ext-all.js"></script>
<script type="text/javascript" src="../sources/extjs/locale/ext-lang-zh_TW.js"></script>

<script type="text/javascript" src="../ConfigEdit/ConfigEdit.js"></script>



</head>
<body>
<script type="text/javascript">
var getGuardManagerNetCard='<%= getGuardManagerNetCard %>';
if(getGuardManagerNetCard == '')getGuardManagerNetCard='<%= ServerIP %>';
var getGuardManagerIP='<%= getGuardManagerIP %>';
var getGuardManagerPort='<%= getGuardManagerPort %>';
var getHardwareKey='<%= getHardwareKey %>';
var isVm='<%= isVm %>'

</script>
</body>
</html>