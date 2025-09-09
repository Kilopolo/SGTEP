package com.kilopolo.sgtep.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @Column(unique = true)
    private String email;
    @Column
    private String name;
    @Column
    private String password;
    @Transient
    private String passwordConfirm;
    @Column
    private String role;
    @Column
    private long lastLogin;
    @Column
    private String image;
    @Column
    private String bio;
    @Column
    private String location;
    @Column
    private String IP;
    @Transient
    private boolean selected = false;
}