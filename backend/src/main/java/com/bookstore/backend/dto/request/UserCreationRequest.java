package com.bookstore.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
//    Long userId;
    String userName;
//    String fullName;
    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;
//    String userAddress;
    @Email(message = "EMAIL_INVALID", regexp = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,7}$")
//        ^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$
    String userEmail;
//    @Size(min=10,max=10, message = "PHONE_INVALID")
    String userPhone;
//    String avatar;
    String gender;
    String role;
//    Date dob;
}
