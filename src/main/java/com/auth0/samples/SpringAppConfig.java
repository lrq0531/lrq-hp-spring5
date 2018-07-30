package com.auth0.samples;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.auth0.samples"})
public class SpringAppConfig implements WebApplicationInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {

        /**
         * AnnotationConfigWebApplicationContext is used to initialize the bean classes.
         * It is more like a util class, it needs to know the root configuration class,
         * then it can finish all the initialization for this class.
         * Here create one and register the root class,
         * then all the sub classes which will be used by this class will be created in spring framework.
         *
         * Like the old ApplicationContext.xml, where you can define multiple beans,
         * to do that you also can create multiple
         * AnnotationConfigWebApplicationContext for different classes,
         * and then add the ContextLoadListner for each to the servlet context.
         */
        AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
        rootContext.register(SpringAppConfig.class);

        /**
         * When tomcat starts, it loads up the servlet to run,
         * here the WebApplicationInitializer will be found in the classpath.
         * INFO: 1 Spring WebApplicationInitializers detected on classpath
         *
         * Add ContextLoadListener to the servletContext, when servlet starts to initialize the application context,
         * ContextLoadListener.contextInitialized() will be triggered to initialize the beans.
         *
         * Servlet context accept multiple ContextLoadListeners, so each one will be called in a loop.
         */
        servletContext.addListener(new ContextLoaderListener(rootContext));



        AnnotationConfigWebApplicationContext dispatcherContext = new  AnnotationConfigWebApplicationContext();

        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher", new DispatcherServlet(dispatcherContext));

        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/lrq-hp-spring5");
    }
}
