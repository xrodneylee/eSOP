package com.dci.esop.util;

import java.sql.Date;
import java.util.Map;

import net.sf.ezmorph.bean.MorphDynaBean;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

public class Util {
	/**
	 * 將JSON物件轉為MAP物件	
	 * @param json
	 * @return
	 */
	public static Map jsonObjParseMap(JSONObject json){
		Map bean = (Map)JSONObject.toBean(json, java.util.HashMap.class);
		Object[] keySet = bean.keySet().toArray();
		for (int i = 0; i < keySet.length; i++) {
			if(bean.get(keySet[i]) instanceof MorphDynaBean){
				MorphDynaBean tempData=(MorphDynaBean)bean.get(keySet[i]);
				if(tempData.get("time")!=null){
					bean.put(keySet[i], new Date((Long)tempData.get("time")));
				}
			}else if(bean.get(keySet[i]) instanceof JSONNull){
				bean.put(keySet[i], null);
			}
		}
		return bean; 
	}
}
