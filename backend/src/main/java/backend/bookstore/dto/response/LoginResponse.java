package backend.bookstore.dto.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private Long userId;
    private String userName;
    private String role;
    private String token;
    private String token_type;
    private Date expire_in; //time in utc
}
