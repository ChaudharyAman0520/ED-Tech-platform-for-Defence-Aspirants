package com.indianarmy.info_platform.user;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String name;
    private String role;
}