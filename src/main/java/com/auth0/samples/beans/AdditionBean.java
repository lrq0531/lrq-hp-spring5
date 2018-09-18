package com.auth0.samples.beans;

import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class AdditionBean {

    public int additionMultiple(int ...allParts) {
       int result = 0;
       for (int index=0; index < allParts.length; index ++) {
           result += allParts[index];
       }

       return result;
    }
}
