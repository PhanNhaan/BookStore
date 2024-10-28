package com.bookstore.backend.services;

import com.bookstore.backend.dto.request.UserCreationRequest;
import com.bookstore.backend.dto.request.UserLoginRequest;
import com.bookstore.backend.dto.request.UserUpdateRequest;
import com.bookstore.backend.dto.response.UserResponse;
import com.bookstore.backend.exception.AppException;
import com.bookstore.backend.exception.ErrorCode;
import com.bookstore.backend.mapper.UserMapper;
import com.bookstore.backend.model.User;
import com.bookstore.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
//    private UserCreationRequest userCreation;
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserRepository userRepository;

    public UserResponse creationUser(UserCreationRequest userCreation) {
        if (userRepository.existsByUserName(userCreation.getUserName()))
            throw new AppException(ErrorCode.USER_EXISTED);

        if (userRepository.existsByUserEmail(userCreation.getUserEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        User user = userMapper.toUser(userCreation);
        user.setPassword(passwordEncoder.encode(userCreation.getPassword()));

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public boolean existsByUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }

    public UserResponse findUserByUsername(String username){
        User user = userRepository.findByUserName(username).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

//    @PostAuthorize("returnObject.userName == authentication.name")
    public UserResponse getUser(String username){

        return userMapper.toUserResponse(userRepository.findByUserName(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

//    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllUsers(){

        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    public User authenticate(UserLoginRequest request){
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        var user = userRepository.findByUserName(request.getUserName()).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return user;
    }

//    @PostAuthorize("returnObject.userName == authentication.name or hasRole('ADMIN')")
    public UserResponse updateUser(UserUpdateRequest userUpdate){
        var user = userRepository.findById(userUpdate.getUserId()).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userMapper.updateUser(user, userUpdate);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(Long userId){
        if (!userRepository.existsById(userId))
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        userRepository.deleteById(userId);
    }
}
