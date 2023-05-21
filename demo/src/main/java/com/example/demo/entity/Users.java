package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Data
@Entity
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "roleId",nullable = false)
    private long roleId;
    @Column(name = "name",nullable = false)
    private String name;
    @Column(name = "tel",nullable = false,unique = true)
    private String tel;
    @Column(name = "password",nullable = false)
    private String password;
    @Column(name = "age")
    private Integer age;
    @Column(name = "address")
    private String address;

    @Column(name ="isDelete")
    @ColumnDefault("false")
    private boolean isDelete;

}
