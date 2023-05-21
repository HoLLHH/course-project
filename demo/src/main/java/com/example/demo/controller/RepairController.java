package com.example.demo.controller;

import com.example.demo.entity.Apply;
import com.example.demo.entity.PayOrder;
import com.example.demo.entity.Repair;
import com.example.demo.repository.ApplyRepository;
import com.example.demo.repository.PayOrderRepository;
import com.example.demo.repository.RepairRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class RepairController {
    private final RepairRepository repairRepository;
    private final ApplyRepository applyRepository;
    private final PayOrderRepository payOrderRepository;

    @GetMapping("/findAllRepair/{page}")
    Page<Repair> findAllRepair(@PathVariable(name = "page") int page){
        Page<Repair> repairPage = repairRepository.findAllRepair(PageRequest.of(page,10));
        return repairPage;
    }

    @GetMapping("/findNotFinishRepair/{page}")
    Page<Repair> findNotFinishRepair(@PathVariable(name = "page") int page){
        Page<Repair> repairPage = repairRepository.findNotFinishRepair(PageRequest.of(page,10));
        return repairPage;
    }

    @GetMapping("/findRepairByTel/{page}")
    Page<Repair> findRepairByTel(@PathVariable(name = "page") int page, @RequestParam(value = "tel") String tel){
        String str = "+"+tel;
        Page<Repair> repairPage = repairRepository.findRepairByTel(str,PageRequest.of(page,10));
        return repairPage;
    }

    @GetMapping("/findRepairById/{id}")
    Repair findRepairById(@PathVariable(value = "id") Long id){return  repairRepository.getReferenceById(id);}

    @PostMapping("/insertRepair")
    void insertRepair(@RequestBody Repair repair){
        Apply apply = applyRepository.getReferenceById(repair.getApplyId());
        apply.setState("start");
        applyRepository.save(apply);
        repairRepository.save(repair);
    }

    @PostMapping("/updateRepair")
    void updateRepair(@RequestBody Repair repair){
        Repair repair1 = repairRepository.getReferenceById(repair.getId());
        repair1.setApplyTime(repair.getApplyTime());
        repair1.setApplyId(repair.getApplyId());
        repair1.setOwnerName(repair.getOwnerName());
        repair1.setTel(repair.getTel());
        repair1.setFault(repair.getFault());
        repair1.setPrice(repair.getPrice());
        repairRepository.save(repair1);
    }

    @PostMapping("/finishRepair")
    void finishRepair(@RequestBody Repair repair){
        Repair repair1 = repairRepository.getReferenceById(repair.getId());
        repair1.setEndTime(repair.getEndTime());
        repair1.setPrice(repair.getPrice());
        repair1.setIsFinish(true);
        Apply apply = applyRepository.getReferenceById(repair1.getApplyId());
        apply.setState("waitPay");
        applyRepository.save(apply);
        PayOrder payOrder = new PayOrder();
        payOrder.setRepairId(repair1.getId());
        payOrder.setTel(repair1.getTel());
        payOrder.setPrice(repair1.getPrice());
        payOrderRepository.save(payOrder);
        repairRepository.save(repair1);
    }

    @PostMapping("/deleteRepairById/{id}")
    void deleteRepairById(@PathVariable(value = "id") Long id){
        Repair repair = repairRepository.getReferenceById(id);
        repair.setDelete(true);
        repairRepository.save(repair);
    }
}
