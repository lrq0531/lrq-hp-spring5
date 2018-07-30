package com.auth0.samples;


import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;

import javax.servlet.ServletException;

public class TomcatStartup {
    private static final int PORT = 8080;

    public static void main(String[] args) {
        try {
            Tomcat kitten = new Tomcat();

            kitten.setPort(PORT);
//            kitten.setBaseDir("/home/roy/projects");
            kitten.getHost().setAppBase(".");
            kitten.addWebapp("", ".");
            kitten.start();

            kitten.getServer().await();
        } catch (LifecycleException e) {
            e.printStackTrace();
        } catch (ServletException e) {
            e.printStackTrace();
        }
    }


}
