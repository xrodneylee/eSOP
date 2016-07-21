<%@ page contentType="text/html; charset=utf-8" pageEncoding="UTF-8" language="java"%>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@ page import="org.apache.commons.fileupload.*"%>
<%@ page import="org.apache.commons.fileupload.disk.*"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.dci.esop.dao.*"%>

<%
request.setCharacterEncoding("UTF-8");
response.setCharacterEncoding("UTF-8");

boolean isMultipart = ServletFileUpload.isMultipartContent(request);

if (isMultipart) {
	String resultAry = "";
	
	DiskFileItemFactory factory = new DiskFileItemFactory();
    ServletContext servletContext = this.getServletConfig().getServletContext();
    File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
    factory.setRepository(repository);
    ServletFileUpload upload = new ServletFileUpload(factory);
    
    try {
        List items = upload.parseRequest(request);
        Iterator iterator = items.iterator();
        
        while (iterator.hasNext()) {
            FileItem item = (FileItem) iterator.next();
            String formatName ="";
            
            if (!item.isFormField()) {
                int index = -1;
                String itename = null;
                if ((index = item.getName().lastIndexOf("\\")) != -1)
                    itename = item.getName().substring(index,item.getName().length());
                else
                    itename = item.getName();
                System.out.println("PATH==========="+repository.getPath() + "\\" + itename);
                File file = new File( repository.getPath() + "\\" + itename);
                item.write(file);  
                
				SOP SOP = new SOP();
				resultAry = SOP.importFile(itename,file);
				file.delete();
            }
            

        }
        response.setContentType("text/html");
        response.getWriter().write("{\"success\": true, \"msg\": "+resultAry+"}");
		
    } catch (FileUploadException e) {
        e.printStackTrace();
        response.setContentType("text/html");
        response.getWriter().write("{\"success\": false, \"msg\": \""+e.getMessage()+"\"}");
    } catch (Exception e) {
        e.printStackTrace();
        response.setContentType("text/html");
        response.getWriter().write("{\"success\": false, \"msg\": \""+e.getMessage()+"\"}");
    }
}else{
	response.setContentType("text/html");
    response.getWriter().write("{\"success\": false, \"msg\": \"無上傳檔案\"}");
}

%>