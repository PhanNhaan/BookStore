package com.bookstore.backend.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity(name = "users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    Long userId;
    @Column(name = "username")
    String userName;
    @Column(name = "full_name")
    String fullName;
    @Column(name = "password")
    String password;
    @Column(name = "address")
    String userAddress;
    @Column(name = "email")
    String userEmail;
    @Column(name = "phone_number")
    String userPhone;
    @Column(name = "avatar")
    String avatar;
    @Column(name = "gender")
    String gender;
    @Column(name = "role")
    String role;
    @Column(name = "dob")
    Date dob;
    @Column(name = "created_at")
    Date createdAt;
    @Column(name = "updated_at")
    Date modifiedAt;
}
