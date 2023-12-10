package org.example;

import jakarta.annotation.PreDestroy;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@SpringBootApplication
public class API {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(API.class);
        app.setDefaultProperties(Collections.singletonMap("server.port", "8051"));
        app.run(args);
    }

}

@RestController
@CrossOrigin(origins = "*")
class MyController {
    private ProducerAPI producerAPI;

    public MyController() {
        this.producerAPI = new ProducerAPI();
    }

    @PostMapping("/api")
    public String receivePost(@RequestBody String json) {
        System.out.println("Received JSON: " + json);
        producerAPI.produceMessage(json);
        return "JSON received successfully!";
    }

    @PreDestroy
    public void onDestroy() throws Exception {
        producerAPI.close();
    }
}


