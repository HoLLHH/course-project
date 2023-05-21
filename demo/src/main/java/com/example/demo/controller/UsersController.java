package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class UsersController {
    private final UsersRepository usersRepository;

    private final RepairRepository repairRepository;
    private final PayOrderRepository payOrderRepository;
    private final ApplyRoleRepository applyRoleRepository;
    private final ApplyRepository applyRepository;

    private final PhoneRepository phoneRepository;

    @GetMapping("/findAllUsers")
    List<Users> findAll(){
        return usersRepository.findAllUsers();
    }

    @GetMapping("/showUsers/{page}")
    Page<Users> showUsers(@PathVariable(value = "page") int page){return usersRepository.findAllUsers(PageRequest.of(page,10));}

    @GetMapping("/showUserInformation/{id}")
    Users showUserInformation(@PathVariable(value = "id") long id){return usersRepository.getReferenceById(id);}

    @PostMapping("/createNewUsers")
    Users createNewUsers(@RequestBody Users users){
        if (usersRepository.check(users.getTel()) == null || !usersRepository.check(users.getTel()).isDelete()){
            usersRepository.save(users);
            return usersRepository.check(users.getTel());
        }else {
            return null;
        }
    }

    @PostMapping("/login")
    Users login(@RequestBody Users users){
        if (usersRepository.check(users.getTel())==null){return null;}
        if (users.getPassword().equals(usersRepository.check(users.getTel()).getPassword())){
            return usersRepository.check(users.getTel());
        }else {
            return null;
        }

//        if (users.getTel() != "" && users.getPassword() != "" && !users.isDelete()){
//            Users users1 = users.getPassword().equals(usersRepository.check(users.getTel()).getPassword())? usersRepository.check(users.getTel()) : null;
//            return users1;
//        }else {return null;}
    }

    @PostMapping("/updateUsers")
    Users updateUsers(@RequestBody Users users){
        Users users1 = usersRepository.getReferenceById(users.getId());
        users1.setName(users.getName());
        users1.setAge(users.getAge());
        users1.setAddress(users.getAddress());
        usersRepository.save(users1);
        return users1;
    }

    @PostMapping("/changeTel")
    Users changeTel(@RequestBody Users users){
        Users users1 = usersRepository.getReferenceById(users.getId());
        List<Apply> applyList = applyRepository.findApplyByTel(users1.getTel());
        List<ApplyRole> applyRoleList = applyRoleRepository.findApplyRoleByTel(users1.getTel());
        List<Repair> repairList = repairRepository.findRepairByTel(users1.getTel());
        List<PayOrder> payOrderList = payOrderRepository.findPayOrderByTel(users1.getTel());
        try{
            if (!applyList.isEmpty()){
                for (Apply apply:applyList){
                    apply.setTel(users.getTel());
                    applyRepository.save(apply);
                }
            }
            if (!applyRoleList.isEmpty()){
                for (ApplyRole applyRole:applyRoleList){
                    applyRole.setTel(users.getTel());
                    applyRoleRepository.save(applyRole);
                }
            }
            if (!repairList.isEmpty()){
                for (Repair repair:repairList){
                    repair.setTel(users.getTel());
                    repairRepository.save(repair);
                }
            }
            if (!payOrderList.isEmpty()){
                for (PayOrder payOrder:payOrderList){
                    payOrder.setTel(users.getTel());
                    payOrderRepository.save(payOrder);
                }
            }
            users1.setTel(users.getTel());
            usersRepository.save(users1);
            return users1;
        }catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    @PostMapping("/changePassword")
    Users changePassword(@RequestBody Users users){
        Users users1 = usersRepository.getReferenceById(users.getId());
        users1.setPassword(users.getPassword());
        usersRepository.save(users1);
        return users1;
    }

    @PostMapping("/deleteUsersById/{id}")
    void deleteUsersById(@PathVariable(value = "id") Long id){
        Users users = usersRepository.getReferenceById(id);
        List<Phone> phoneList = phoneRepository.findPhoneByOwnerId(id);
        for (Phone phone: phoneList){
            phone.setDelete(true);
            phoneRepository.save(phone);
        }
        users.setDelete(true);
        usersRepository.save(users);
    }
}
