<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.dci.esop.sql.ConnectionManager" %>
<%@ page import="com.dci.esop.register.CryptoManager" %>
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
CryptoManager cm = CryptoManager.getInstance();
String sessionId = session.getId();
String ip = request.getRemoteAddr();
int VMCertificationDay=cm.getVerifyFailDay();
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
<script>
var ip = "<%=ip %>";
var sessionId = "<%=sessionId %>";
var authenticationDay = "<%= VMCertificationDay %>";

if(authenticationDay>=0){
	if(authenticationDay<7)
		Ext.Msg.alert('','授權失敗，授權試用中，己試用'+(authenticationDay+1)+'天<br/>請確認GuardService或授權碼');
	else
		Ext.Msg.alert('','授權失敗，授權過期'+(authenticationDay+1)+'天<br/>請確認GuardService或授權碼');
}
</script>	
</body>
</html>