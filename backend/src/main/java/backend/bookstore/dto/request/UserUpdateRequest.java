package backend.bookstore.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    Long userId;
//    String userName;
    String fullName;
    String userAddress;
//    String userEmail;
    String userPhone;
    String avatar;
    String gender;
    String role;
    Date dob;
}
