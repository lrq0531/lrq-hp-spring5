package com.auth0.samples;

import com.auth0.samples.beans.AdditionBean;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AccessBeans {
    public static void main(String[] args) {
        System.out.println("I am going to call methods from the beans.");

        AnnotationConfigApplicationContext acac = new AnnotationConfigApplicationContext();
        acac.register(BasicConfigClass.class);
        acac.refresh();

        AdditionBean additionBean = acac.getBean(AdditionBean.class);
        System.out.println("1+2+3+4="+additionBean.additionMultiple(1,2,3,4));
    }
}
