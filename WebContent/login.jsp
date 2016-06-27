<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>eSOP登入首頁</title>

<link rel="stylesheet" type="text/css" href="sources/extjs/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="sources/css/eSop.css">
<script type="text/javascript" src="sources/extjs/ext-all.js"></script>
<script type="text/javascript" src="sources/extjs/locale/ext-lang-zh_TW.js"></script>

<script type="text/javascript" src="login/login.js"></script>

</head>
<script type="text/javascript">
var obj = new Object();
obj.USER="Lee Guan Pu";
Ext.Ajax.request({
    url: '/eSOP/api/ajax/hello',
    method: "POST",
    params:{
		data : Ext.encode(obj)
	},
    success: function (response) {
        alert(response.responseText);
    },
    failure: function (response) {
        //top.location.replace("InitSet.jsp");
    }
});
</script>
<body>
	
</body>
</html>