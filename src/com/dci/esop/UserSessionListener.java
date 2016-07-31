package com.dci.esop;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class UserSessionListener implements HttpSessionListener  {
	
	public void sessionCreated(HttpSessionEvent se) {
		HttpSession session = se.getSession();
		System.out.println("TYPE:sessionCreated => session ID ="+session.getId());
	}

	public void sessionDestroyed(HttpSessionEvent se) {
		
	}
}
