package com.example.demo.repository;

import com.example.demo.entity.PayOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayOrderRepository extends JpaRepository<PayOrder,Long> {
    @Query(value = "select * from pay_order where is_delete = false order by id desc",nativeQuery = true)
    List<PayOrder> findAllPayOrder();
    @Query(value = "select * from pay_order where is_delete = false order by id desc",countQuery = "select count(*) from pay_order where is_delete = false",nativeQuery = true)
    Page<PayOrder> findAllPayOrder(Pageable pageable);

    @Query(value = "select * from pay_order where tel = ?1 and is_delete = false",countQuery = "select count(*) from pay_order where tel = ?1 and is_delete = false",nativeQuery = true)
    Page<PayOrder> findPayOrderByTel(String tel, Pageable pageable);
    @Query(value = "select * from pay_order where tel = ?1",nativeQuery = true)
    List<PayOrder> findPayOrderByTel(String tel);

    @Query(value = "select * from pay_order where is_delete = false and is_pay = false",countQuery = "select count(*) from pay_order where is_delete = false and is_pay = false",nativeQuery = true)
    Page<PayOrder> findWithoutPaymentByTel(String tel,Pageable pageable);
}
