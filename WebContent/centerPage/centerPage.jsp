<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.dci.esop.register.VirtualMachine" %>
<%@ page import="com.dci.esop.dao.CONFIG" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<link rel="stylesheet" type="text/css" href="../sources/extjs/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="../sources/css/eSOP.css">
<script type="text/javascript" src="../sources/extjs/ext-all.js"></script>
<script type="text/javascript" src="../sources/extjs/locale/ext-lang-zh_TW.js"></script>
<script type="text/javascript" src="../sources/js/sft_timer.js"></script>

<script type="text/javascript" src="../centerPage/centerPage.js"></script>
<%
	CONFIG CONFIG = new CONFIG();
	String userId=request.getParameter("userId");
%>
</head>
<body>
<script language="JavaScript" type="text/JavaScript">
	var userID="<%=userId%>";
	var maxInactiveInterval=<%=CONFIG.getMaxInactiveInterval()%>/60;
</script>
</body>
</html>