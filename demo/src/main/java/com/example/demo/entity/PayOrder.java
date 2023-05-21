package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Data
@Entity
@Table(name = "payOrder")
public class PayOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tel",nullable = false)
    private String tel;

    @Column(name = "repairId",nullable = false)
    private Long repairId;

    @Column(name = "price")
    private Long price;

    @Column(name = "isPay")
    @ColumnDefault("false")
    private boolean isPay;

    @Column(name ="isDelete")
    @ColumnDefault("false")
    private boolean isDelete;
}
