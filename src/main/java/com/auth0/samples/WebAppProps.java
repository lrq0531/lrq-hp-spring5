package com.auth0.samples;

import org.springframework.web.bind.annotation.RestController;

public class WebAppProps {

    public WebAppProps() {
        String s = "Track the bean intialization.";
        System.out.println(s);
    }

    public String getAllProps() {
        return "Here you are";
    }
}
