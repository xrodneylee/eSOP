package com.dci.esop.util;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;

import com.dci.esop.dao.CONFIG;

public class PDFToImg {
	
	public static void create(String fileName) throws IOException{
		CONFIG CONFIG = new CONFIG();
		String PDFPath = CONFIG.getESOPFileRoute()+fileName;
		File imageFile = new File(CONFIG.getESOPFileRoute()+"images");
		if(!imageFile.exists()){
			imageFile.mkdirs();
		}
        PDDocument doc = PDDocument.load(PDFPath);
        try {
        	List pages = doc.getDocumentCatalog().getAllPages();
            PDPage page = (PDPage) pages.get(0);
            BufferedImage image = page.convertToImage();
			ImageIO.write(image, "jpg", new File(CONFIG.getESOPFileRoute()+"images" + File.separator + fileName.replace(".pdf",".jpg")));
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(doc != null){
				doc.close();
			}
		}
	}
}
