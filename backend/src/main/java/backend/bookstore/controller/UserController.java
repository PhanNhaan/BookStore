package backend.bookstore.controller;

import backend.bookstore.dto.request.UserCreationRequest;
import backend.bookstore.dto.response.ApiResponse;
import backend.bookstore.dto.response.UserResponse;
import backend.bookstore.mapper.UserMapper;
import backend.bookstore.model.User;
import backend.bookstore.services.AuthenticationService;
import backend.bookstore.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserService userService;

    private UserMapper userMapper;

    @PostMapping("/signup")
    public ApiResponse<User> register(@RequestBody @Valid UserCreationRequest user) {
        User userCreation = userService.creationUser(user);

        return ApiResponse.<User>builder()
                .result(userCreation).build();

    }

    @GetMapping("/me")
//    @PostAuthorize("returnObject.username == authentication.name")
    public ApiResponse<UserResponse> getInfo(@RequestHeader("Authorization") String accessToken){
        String token = accessToken.substring(7);
        var userName = authenticationService.extractUsername(token);
        log.info(userName);

        return ApiResponse.<UserResponse>builder()
                .result(userService.getUser(userName)).build();
    }

    @GetMapping()
//    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse<List<UserResponse>> getAllUsers(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("Username: {}", authentication.getName());
        log.info("role: {}", authentication.getAuthorities());

        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getAllUsers())
                .build();
    }
}
