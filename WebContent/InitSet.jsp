<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.dci.esop.register.VirtualMachine" %>
<%@ page import="java.net.UnknownHostException" %>
<%@ page import="java.io.IOException" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<link rel="stylesheet" type="text/css" href="sources/extjs/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="sources/css/eSOP.css">
<script type="text/javascript" src="sources/extjs/ext-all.js"></script>
<script type="text/javascript" src="sources/extjs/locale/ext-lang-zh_TW.js"></script>
 
<script type="text/javascript" src="initSet/initSet.js"></script>
<%
String loginip = request.getRemoteAddr();
String vmmessage = "";
try {
	VirtualMachine vm = new VirtualMachine();
	boolean isVm = vm.isVM();
	if (isVm) {
		if (vm.getVMCertification()) {
			vmmessage = "是(認證通過)";
		} else {
			vmmessage = "是(認證失敗)";
		}
	} else {
		vmmessage = "否";
	}
} catch (UnknownHostException e) {
	vmmessage = "是(GuardService連接失敗，請進行環境設定)";
} catch (IOException e) {
	vmmessage = "是(GuardService連接失敗，請進行環境設定)";
} catch (Exception e) {
	response.sendRedirect("/eSOP/ConfigEdit/ConfigEdit.jsp");
}
%>
</head>
<body>
<script>
var currentIP = "<%=loginip %>";
var vmmessage = "<%=vmmessage %>";
</script>
<!-- 
<h1>File Upload with Jersey</h1>
 
	<form action="api/ajax/upload" method="post" enctype="multipart/form-data" >
 
	   <p>
		Select a file : <input type="file" name="file" size="45" />
	   </p>
 
	   <input type="submit" value="Upload It" />
	</form>
-->
</body>
</html>