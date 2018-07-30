package com.auth0.samples.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comein")
public class ControllerHello {

    @GetMapping
    public String youAreWelcome() {
        return "How are you!";
    }
}
