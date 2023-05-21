package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.util.Date;

@Data
@Entity
@Table(name = "repair")
public class Repair {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "applyId",nullable = false)
    private Long applyId;

    @Column(name = "applyTime",nullable = false)
    private String applyTime;

    @Column(name = "endTime")
    private String endTime;

    @Column(name = "ownerName")
    private String ownerName;

    @Column(name = "tel",nullable = false)
    private String tel;

    @Column(name = "phoneModel",nullable = false)
    private String phoneModel;

    @Column(name = "phoneManufacturer",nullable = false)
    private String PhoneManufacturer;

    @Column(name = "fault")
    private String fault;

    @Column(name = "price")
    private Long price;

    @Column(name="isFinish")
    @ColumnDefault("false")
    private Boolean isFinish;

    @Column(name ="isDelete")
    @ColumnDefault("false")
    private boolean isDelete;
}
