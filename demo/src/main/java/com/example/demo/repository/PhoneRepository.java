package com.example.demo.repository;

import com.example.demo.entity.PayOrder;
import com.example.demo.entity.Phone;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhoneRepository extends JpaRepository<Phone,Long> {
    @Query(value = "select * from phone where is_delete = false",nativeQuery = true)
    List<Phone> findAllPhone();
    @Query(value = "select * from phone where is_delete = false order by id desc",countQuery = "select count(*) from phone where is_delete = false",nativeQuery = true)
    Page<PayOrder> findAllPhone(Pageable pageable);

    @Query(value = "select * from phone where owner_id = ?1",nativeQuery = true)
    List<Phone> findPhoneByOwnerId(Long ownerId);
    @Query(value = "select * from phone where owner_id = ?1 and is_delete = false order by id desc",countQuery = "select count(*) from phone where owner_id = ?1 and is_delete = false",nativeQuery = true)
    Page<PayOrder> findPhoneByOwnerId(Long id, Pageable pageable);
}
