<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.dci.esop.authentication.UdpGetClientMacAddr" %>
<%@ page import="com.dci.esop.sql.ConnectionManager" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>eSOP System</title>

<% 
	String stationIP = request.getRemoteAddr();
	UdpGetClientMacAddr addr = new UdpGetClientMacAddr(stationIP);
	String MAC = addr.GetRemoteMacAddr();
	String flag = "";
	String station = "";
	String ST001 = "";
	try{
		ConnectionManager conm = new ConnectionManager();
		ST001 = conm.queryForSingleString(" SELECT ST001 FROM STATION WHERE ST003='"+MAC+"' ", null);
		if(conm.queryForSingleInteger(" SELECT COUNT(1) FROM STATION WHERE ST003='"+MAC+"' AND ST006='Y' AND ST007='Y' ", null) > 0){
			flag = "confirm";
			station = conm.queryForSingleString(" SELECT ST001 FROM STATION WHERE ST003='"+MAC+"' AND ST006='Y' AND ST007='Y' ", null);
		}else if(conm.queryForSingleInteger(" SELECT COUNT(1) FROM STATION WHERE ST003='"+MAC+"' AND ST006='Y' ", null) > 0){
			//導向推播頁面
			response.sendRedirect("/eSOP/BroadcastingPage/BroadcastingPage.jsp?SS001="+ST001);
		}else{
			//導向eSOP註冊頁面
			response.sendRedirect("/eSOP/spotRegister/spotRegister.jsp");
		}
	}catch(Exception e){
		//導向設定頁面
		e.printStackTrace();
		response.sendRedirect("InitSet.jsp");
	}
%>

</head>
<body>
<script>
var flag = "<%=flag %>";
var stationIP = "<%=stationIP %>";
var station = "<%=station %>";
var SS001 = "<%=ST001 %>";
if(flag == "confirm"){
	if(confirm("此工位已在登入狀態，請問是否重複登入?\n工位="+'<%=station %>'+",登入IP="+'<%=stationIP %>')){
		self.location.replace('/eSOP/BroadcastingPage/BroadcastingPage.jsp?SS001='+SS001);
	}else{
		
	}
}
</script>
	
</body>
</html>