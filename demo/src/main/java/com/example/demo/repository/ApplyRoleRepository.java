package com.example.demo.repository;

import com.example.demo.entity.ApplyRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplyRoleRepository extends JpaRepository<ApplyRole,Long> {
    @Query(value = "select * from apply_role where is_delete = false order by id desc",nativeQuery = true)
    List<ApplyRole> findAllApplyRole();
    @Query(value = "select * from apply_role where is_delete = false order by id desc",countQuery = "select count(*) from apply_role where is_delete = false",nativeQuery = true)
    Page<ApplyRole> findAllApplyRole(Pageable pageable);

    @Query(value = "select * from apply_role where is_processed = false and is_delete = false",nativeQuery = true)
    List<ApplyRole> findNotProcessedRole();

    @Query(value = "select * from apply_role where tel = ?1 and is_delete = false",countQuery = "select count(*) from apply_role where tel = ?1 and is_delete = false",nativeQuery = true)
    Page<ApplyRole> findApplyRoleByTel(String tel, Pageable pageable);
    @Query(value = "select * from apply_role where tel = ?1",nativeQuery = true)
    List<ApplyRole> findApplyRoleByTel(String tel);
}
