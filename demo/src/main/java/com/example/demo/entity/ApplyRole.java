package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Data
@Entity
@Table(name = "applyRole")
public class ApplyRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tel",nullable = false)
    private String tel;

    @Column(name = "roleId",nullable = false)
    private Long roleId;

    @Column(name = "applyRoleId",nullable = false)
    private Long applyRoleId;

    @Column(name = "reason")
    private String reason;

    @Column(name = "isProcessed")
    @ColumnDefault("false")
    private boolean isProcessed;

    @Column(name = "notAllowed")
    @ColumnDefault("false")
    private boolean notAllowed;

    @Column(name ="isDelete")
    @ColumnDefault("false")
    private boolean isDelete;
}
