package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.util.Date;

@Data
@Entity
@Table(name = "apply")
public class Apply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "time")
    private String time;

    @Column(name = "fault",nullable = false)
    private String fault;

    @Column(name = "tel",nullable = false)
    private String tel;

    @Column(name = "phoneModel",nullable = false)
    private String phoneModel;

    @Column(name = "phoneManufacturer",nullable = false)
    private String PhoneManufacturer;

    @Column(name = "suggestion")
    private String suggestion;

    @Column(name = "operate")
    private String operate;

    @Column(name = "estimatedDays")
    private Long estimatedDays;

    @Column(name = "valuation")
    private Long valuation;

    @Column(name = "isProcessed")
    @ColumnDefault("false")
    private boolean isProcessed;

    @Column(name = "state")
    private String state;

    @Column(name ="isDelete")
    @ColumnDefault("false")
    private boolean isDelete;
}
