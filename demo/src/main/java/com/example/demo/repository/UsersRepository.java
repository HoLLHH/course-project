package com.example.demo.repository;

import com.example.demo.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {

    @Query(value = "select * from users where tel = ?1 and is_delete = false",nativeQuery = true)
    Users check(String tel);

    @Query(value = "select * from users where is_delete = false",nativeQuery = true)
    List<Users> findAllUsers();
    @Query(value = "select * from users where is_delete = false order by id desc",countQuery = "select count(*) from users where is_delete = false",nativeQuery = true)
    Page<Users> findAllUsers(Pageable pageable);

}
