package com.example.demo.repository;

import com.example.demo.entity.Apply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ApplyRepository extends JpaRepository<Apply,Long> {
    @Query(value = "select * from apply where is_delete = false order by id desc",countQuery = "select count(*) from apply where is_delete = false",nativeQuery = true)
    Page<Apply> findAllApply(Pageable pageable);

    @Query(value = "select * from apply where tel = ?1 and is_delete = false",countQuery = "select count(*) from apply where tel = ?1 and is_delete = false",nativeQuery = true)
    Page<Apply> findApplyByTel(String tel,Pageable pageable);

    @Query(value = "select * from apply where tel = ?1",nativeQuery = true)
    List<Apply> findApplyByTel(String tel);

    @Query(value = "select * from apply where is_delete = false and is_processed = false order by id desc",countQuery = "select count(*) from apply where is_delete = false and is_processed = false",nativeQuery = true)
    Page<Apply> findNotProcessedApplyDESC(Pageable pageable);

    @Query(value = "select * from apply where is_delete = false and is_processed = false",countQuery = "select count(*) from apply where is_delete = false and is_processed = false",nativeQuery = true)
    Page<Apply> findNotProcessedApply(Pageable pageable);
}
