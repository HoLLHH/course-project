package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Data
@Entity
@Table(name = "phone")
public class Phone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "model",nullable = false)
    private String model;

    @Column(name = "manufacturer",nullable = false)
    private String manufacturer;

    @Column(name = "ownerId",nullable = false)
    private Long ownerId;

    @Column(name ="isDelete")
    @ColumnDefault("false")
    private boolean isDelete;
}
