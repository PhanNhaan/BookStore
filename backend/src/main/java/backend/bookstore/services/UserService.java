package backend.bookstore.services;

import backend.bookstore.dto.request.UserCreationRequest;
import backend.bookstore.dto.request.UserLoginRequest;
import backend.bookstore.dto.response.UserResponse;
import backend.bookstore.exception.AppException;
import backend.bookstore.exception.ErrorCode;
import backend.bookstore.mapper.UserMapper;
import backend.bookstore.model.User;
import backend.bookstore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
//    private UserCreationRequest userCreation;
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserRepository userRepository;

    public User creationUser(UserCreationRequest userCreation) {
        if (userRepository.existsByUserName(userCreation.getUserName()))
            throw new AppException(ErrorCode.USER_EXISTED);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        User user = userMapper.toUser(userCreation);
        user.setPassword(passwordEncoder.encode(userCreation.getPassword()));

        return userRepository.save(user);
    }

    public UserResponse findUserByUsername(String username){
        User user = userRepository.findByUserName(username).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @PostAuthorize("returnObject.userName == authentication.name")
    public UserResponse getUser(String username){

        UserResponse userResponse = userMapper.toUserResponse(userRepository.findByUserName(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
        return userResponse;
    }

//    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllUsers(){
//        log.info("1");
        var user = userRepository.findAll().stream().map(userMapper::toUserResponse).toList();

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
}
