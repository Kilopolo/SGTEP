package com.kilopolo.sgtep.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class DockerMessageController {
    @GetMapping("/messages")
    public String getMessage() {
        return "Hello from Docker!";
    }
}
