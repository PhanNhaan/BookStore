package backend.bookstore.mapper;

import backend.bookstore.dto.request.UserCreationRequest;
import backend.bookstore.dto.response.LoginResponse;
import backend.bookstore.dto.response.UserResponse;
import backend.bookstore.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    LoginResponse toLoginResponse(User user);

//    void LoginUser(@MappingTarget User user, User user);
}
