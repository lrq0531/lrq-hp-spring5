package com.auth0.samples.controller;

import com.auth0.samples.WebAppProps;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comein")
public class ControllerHello {

    private WebAppProps webAppProps;

    public WebAppProps getWebAppProps() {
        return webAppProps;
    }

    public void setWebAppProps(WebAppProps webAppProps) {
        this.webAppProps = webAppProps;
    }

    public ControllerHello () {
        String s = "Track the bean intialization.";
        System.out.println(s);
    }

    @GetMapping
    public String youAreWelcome() {
        return "How are you!";
    }
}
