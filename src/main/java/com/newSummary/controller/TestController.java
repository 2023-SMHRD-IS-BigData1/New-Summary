package com.newSummary.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
//g
@RestController
public class TestController {
    @GetMapping("/data")
    public String test() {
        return "Hello, world!";
    }
}
