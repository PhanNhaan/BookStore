package backend.bookstore.controller;

import backend.bookstore.dto.request.UserLoginRequest;
import backend.bookstore.dto.response.ApiResponse;
import backend.bookstore.dto.response.LoginResponse;
import backend.bookstore.mapper.UserMapper;
import backend.bookstore.services.AuthenticationService;
import backend.bookstore.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
                .expire_in(authenticationService. extractExpiration(token))
                .build();

        return ApiResponse.<LoginResponse>builder()
                        .result(user).build();

    }
}
