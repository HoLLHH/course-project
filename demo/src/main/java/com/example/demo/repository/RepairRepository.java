package com.example.demo.repository;

import com.example.demo.entity.Repair;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepairRepository extends JpaRepository<Repair,Long> {
    @Query(value = "select * from repair where is_delete = false",nativeQuery = true)
    List<Repair> findAllRepair();
    @Query(value = "select * from repair where is_delete = false order by id desc",countQuery = "select count(*) from repair is_delete = false",nativeQuery = true)
    Page<Repair> findAllRepair(Pageable pageable);

    @Query(value = "select * from repair where tel = ?1 and is_delete = false order by id desc",countQuery = "select count(*) from repair where tel = ?1 and is_delete = false",nativeQuery = true)
    Page<Repair> findRepairByTel(String tel,Pageable pageable);

    @Query(value = "select * from repair where tel = ?1",nativeQuery = true)
    List<Repair> findRepairByTel(String tel);

    @Query(value = "select * from repair where is_delete = false and is_Finish = false",countQuery = "select count(*) from repair where is_delete = false and is_Finish = false ",nativeQuery = true)
    Page<Repair> findNotFinishRepair(Pageable pageable);

    @Query(value = "select * from repair where is_delete = false and is_Finish = false",nativeQuery = true)
    List<Repair> findNotFinishRepair();
}
