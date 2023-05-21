package com.example.demo.controller;

import com.example.demo.entity.Apply;
import com.example.demo.entity.Users;
import com.example.demo.repository.ApplyRepository;
import com.example.demo.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class ApplyController {
    private final ApplyRepository applyRepository;
    private final UsersRepository usersRepository;

    @GetMapping("/findAllApply/{page}")
    Page<Apply> findAllApply(@PathVariable(value = "page") int page){
        Page<Apply> applyPage = applyRepository.findAllApply(PageRequest.of(page,10));
        return applyPage;}

//    @GetMapping("findApplyByTel/{page}")
//    Page<Apply> findApplyByTel(@PathVariable(value = "page") int page , @RequestBody Users users){
//        Page<Apply> applyPage = applyRepository.findApplyByTel(users.getTel(),PageRequest.of(page,10));
//        return applyPage;
//    }

    @GetMapping("findApplyByTel/{page}")
    Page<Apply> findApplyByTel(@PathVariable(value = "page") int page,@RequestParam(name = "tel") String tel){
        String str = "+";
        Page<Apply> applyPage = applyRepository.findApplyByTel(str+tel,PageRequest.of(page,10));
        return applyPage;
    }

    @GetMapping("/findApplyById/{id}")
    Apply findApplyById(@PathVariable(value = "id") Long id){return applyRepository.getReferenceById(id);}

    @GetMapping("/findNotProcessedApply/{page}")
    Page<Apply> findNotProcessedApply(@PathVariable(value = "page") int page){
        Page<Apply> applyPage = applyRepository.findNotProcessedApply(PageRequest.of(page,10));
        return applyPage;
    }

    @PostMapping("/insertApply")
    void insertApply(@RequestBody Apply apply){applyRepository.save(apply);}

    @PostMapping("/updateApply")
    void updateApply(@RequestBody Apply apply){
            Apply apply1 = applyRepository.getReferenceById(apply.getId());
            if (apply1.isProcessed()==false){
                apply1.setTime(apply.getTime());
                apply1.setFault(apply.getFault());
                apply1.setTel(apply.getTel());
                apply1.setPhoneModel(apply.getPhoneModel());
                apply1.setPhoneManufacturer(apply1.getPhoneManufacturer());
                applyRepository.save(apply1);
            }

    }

    @PostMapping("/processedApply")
    void processedApply(@RequestBody Apply apply){
        Apply apply1 = applyRepository.getReferenceById(apply.getId());
        apply1.setOperate(apply.getOperate());
        apply1.setEstimatedDays(apply.getEstimatedDays());
        apply1.setValuation(apply.getValuation());
        apply1.setProcessed(true);
        applyRepository.save(apply1);
    }

    @PostMapping("/addSuggestion")
    void addSuggestion(@RequestBody Apply apply){
        Apply apply1 = applyRepository.getReferenceById(apply.getId());
        apply1.setSuggestion(apply.getSuggestion());
        apply1.setProcessed(true);
        applyRepository.save(apply1);
    }

    @PostMapping("/setApplyState/{id}")
    void setApplyState(@PathVariable(value = "id") Long id,@RequestBody Apply apply){
        Apply apply1 = applyRepository.getReferenceById(id);
        apply.setState(apply.getState());
        applyRepository.save(apply);
    }

    @PostMapping("/deleteApplyById/{id}")
    void deleteApplyById(@PathVariable(value = "id") Long id){
        Apply apply = applyRepository.getReferenceById(id);
        apply.setDelete(true);
        applyRepository.save(apply);
    }
}
