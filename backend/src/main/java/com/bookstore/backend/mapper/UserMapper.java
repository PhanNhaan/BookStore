package com.bookstore.backend.mapper;

import com.bookstore.backend.dto.request.UserCreationRequest;
import com.bookstore.backend.dto.request.UserUpdateRequest;
import com.bookstore.backend.dto.response.LoginResponse;
import com.bookstore.backend.dto.response.UserResponse;
import com.bookstore.backend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    LoginResponse toLoginResponse(User user);

//    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
