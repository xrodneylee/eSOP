package com.dci.esop;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import com.dci.esop.ajax.ajaxController;


@ApplicationPath("/api")
public class ajaxApplication extends Application{
    @Override
    public Set<Class<?>> getClasses() {
        final Set<Class<?>> classes = new HashSet<Class<?>>();
        classes.add(ajaxController.class);
        return classes;
    }
}
