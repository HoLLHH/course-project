package com.example.demo.controller;

import com.example.demo.entity.ApplyRole;
import com.example.demo.repository.ApplyRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class ApplyRoleController {
    private final ApplyRoleRepository applyRoleRepository;

    @GetMapping("/findAllAppleRole")
    List<ApplyRole> findAllApplyRole(){return applyRoleRepository.findAllApplyRole();}

    @GetMapping("/findNotProcessedApplyRole")
    List<ApplyRole> findNotProcessedApplyRole(){return applyRoleRepository.findNotProcessedRole();}

    @GetMapping("/findApplyRoleByTel")
    List<ApplyRole> findApplyRoleByTel(@RequestParam(value = "tel") String tel){return applyRoleRepository.findApplyRoleByTel(tel);}

    @PostMapping("/insertApplyRole")
    void insertApplyRole(@RequestBody ApplyRole applyRole){
        applyRoleRepository.save(applyRole);
    }

    @PostMapping("/updateApplyRole")
    void updateApplyRole(@RequestBody ApplyRole applyRole){
        ApplyRole applyRole1 = applyRoleRepository.getReferenceById(applyRole.getId());
        applyRole1.setApplyRoleId(applyRole.getApplyRoleId());
        applyRole1.setProcessed(true);
        applyRoleRepository.save(applyRole);
    }

    @PostMapping("/setApplyRoleNotAllowed")
    void setApplyRoleNotAllowed(@RequestBody ApplyRole applyRole){
        ApplyRole applyRole1 = applyRoleRepository.getReferenceById(applyRole.getId());
        applyRole1.setNotAllowed(true);
        applyRoleRepository.save(applyRole);
    }

    @PostMapping("/deleteApplyRoleById/{id}")
    void deleteApplyRoleById(@PathVariable(value = "id") Long id){
        ApplyRole applyRole = applyRoleRepository.getReferenceById(id);
        applyRole.setDelete(true);
        applyRoleRepository.save(applyRole);
    }
}
