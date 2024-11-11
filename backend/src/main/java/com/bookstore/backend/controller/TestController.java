package com.bookstore.backend.controller;


//import com.bookstore.backend.config.RedisConfig;
import com.bookstore.backend.services.RedisSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private RedisSevice redisSevice;

    @GetMapping()
    public ResponseEntity<String> getDefault() {
        return ResponseEntity.status(200).body("Hello");
    }

    @GetMapping("/redis/set")
    public ResponseEntity<String> setRedis() {
        redisSevice.setKey("book1", "book");

        return ResponseEntity.status(200).body(redisSevice.getKey("book1"));
    }
}

