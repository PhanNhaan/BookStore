package backend.bookstore.controller;

import backend.bookstore.dto.request.UserCreationRequest;
import backend.bookstore.dto.request.UserUpdateRequest;
import backend.bookstore.dto.response.ApiResponse;
import backend.bookstore.dto.response.UserResponse;
import backend.bookstore.exception.AppException;
import backend.bookstore.exception.ErrorCode;
import backend.bookstore.mapper.UserMapper;
import backend.bookstore.model.User;
import backend.bookstore.services.AuthenticationService;
import backend.bookstore.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserService userService;

    private UserMapper userMapper;

    @GetMapping("/checkusername")
    public ApiResponse<String> checkUsername(@RequestParam String username) {
        if (userService.existsByUserName(username))
            throw new AppException(ErrorCode.USER_EXISTED);

        return ApiResponse.<String>builder()
                .result("Ok")
                .build();
    }

    @PostMapping("/signup")
    public ApiResponse<UserResponse> register(@RequestBody @Valid UserCreationRequest user) {
        var userCreation = userService.creationUser(user);

        return ApiResponse.<UserResponse>builder()
                .result(userCreation).build();
    }

    @PutMapping()
    @PostAuthorize("returnObject.result.userName == authentication.name or hasRole('ADMIN')")
    public ApiResponse<UserResponse> update(@RequestBody @Valid UserUpdateRequest request) {
        var user = userService.updateUser(request);

        return ApiResponse.<UserResponse>builder()
                .result(user).build();
    }

    @DeleteMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<String> delete(@RequestParam Long userId) {
        userService.deleteUser(userId);
        return ApiResponse.<String>builder().result("User has been deleted").build();
    }

    @GetMapping("/info")
    @PostAuthorize("returnObject.result.userName == authentication.name")
    public ApiResponse<UserResponse> getInfo(@RequestHeader("Authorization") String accessToken){
        String token = accessToken.substring(7);
        var userName = authenticationService.extractUsername(token);
        log.info(userName);

        return ApiResponse.<UserResponse>builder()
                .result(userService.getUser(userName)).build();
    }

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<UserResponse>> getAllUsers(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("Username: {}", authentication.getName());
        log.info("role: {}", authentication.getAuthorities());

        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getAllUsers())
                .build();
    }


}
