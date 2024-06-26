package com.vtcorp.store.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {

    private String username;
    private String name;
    private String mail;
    private String phone;
    private Long cityCode;
    private Long districtId;
    private Long wardCode;
    private String street;
    private Integer point;
    private String role;
}
