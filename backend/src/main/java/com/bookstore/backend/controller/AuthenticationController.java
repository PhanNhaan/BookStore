package com.bookstore.backend.controller;

import com.bookstore.backend.dto.request.TokenRequest;
import com.bookstore.backend.dto.request.UserLoginRequest;
import com.bookstore.backend.dto.response.ApiResponse;
import com.bookstore.backend.dto.response.LoginResponse;
import com.bookstore.backend.mapper.UserMapper;
import com.bookstore.backend.services.AuthenticationService;
import com.bookstore.backend.services.UserService;
import com.nimbusds.jose.JOSEException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper userMapper;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody UserLoginRequest userLoginRequest){

        var userLogin = userService.authenticate(userLoginRequest);

        var token = authenticationService.generateToken(userLogin);

        var user = LoginResponse.builder()
                .userId(userLogin.getUserId())
                .userName(userLogin.getUserName())
                .role(userLogin.getRole())
                .token(token)
                .token_type("Bearer")
                .expire_in(authenticationService.extractExpiration(token))
                .build();

        return ApiResponse.<LoginResponse>builder()
                        .result(user).build();

    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(@RequestHeader("Authorization") String accessToken)
            throws ParseException, JOSEException {
        String token = accessToken.substring(7);
        authenticationService.logout(token);
        return ApiResponse.<Void>builder()
                .build();

    }

    @PostMapping("/refresh")
    public ApiResponse<LoginResponse> refresh(@RequestBody TokenRequest tokenRequest)
            throws ParseException, JOSEException {

//        var token = accessToken.substring(7);
        log.info("token: "+ tokenRequest.getToken());

        var result = authenticationService.refreshToken(tokenRequest.getToken());

        return ApiResponse.<LoginResponse>builder()
                .result(result)
                .build();

    }
}
