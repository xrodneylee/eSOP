<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.dci.esop.dao.CONFIG" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%
	CONFIG CONFIG = new CONFIG();
	String SS001 = request.getParameter("SS001");
%>
<link rel="stylesheet" type="text/css" href="../sources/extjs/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="../sources/css/eSOP.css">
<script type="text/javascript" src="../sources/extjs/ext-all.js"></script>
<script type="text/javascript" src="../sources/extjs/locale/ext-lang-zh_TW.js"></script>

<script type="text/javascript" src="../BroadcastingPage/util/eSOP_timer.js"></script>
<script type="text/javascript" src="../BroadcastingPage/util/hashset.js"></script>
<script type="text/javascript" src="../BroadcastingPage/util/fileNode.js"></script>
<script type="text/javascript" src="../BroadcastingPage/util/versionNode.js"></script>
<script type="text/javascript" src="../BroadcastingPage/BroadcastingPage.js"></script>

</head>
<body>
<script>
	var SS001 = "<%=SS001 %>";
	var checkFileInterval=<%=CONFIG.getCheckFileInterval()%>;
</script>
</body>
</html>