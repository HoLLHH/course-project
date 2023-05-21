package com.example.demo.controller;

import com.example.demo.entity.Apply;
import com.example.demo.entity.PayOrder;
import com.example.demo.repository.ApplyRepository;
import com.example.demo.repository.PayOrderRepository;
import com.example.demo.repository.RepairRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class PayOrderController {
    private final PayOrderRepository payOrderRepository;
    private final ApplyRepository applyRepository;
    private final RepairRepository repairRepository;

    @GetMapping("/findAllPayOrder/{page}")
    Page<PayOrder> findAllPayOrder(@PathVariable(name = "page") int page){return payOrderRepository.findAllPayOrder(PageRequest.of(page,10));}

    @GetMapping("/findPayOrderByTel/{page}")
    Page<PayOrder> findPayOrderByTel(@PathVariable(name = "page") int page ,@RequestParam(value = "tel") String tel){
        String str = "+"+tel;
        return payOrderRepository.findPayOrderByTel(str,PageRequest.of(page,10));
    }

    @GetMapping("/findPayOrderById/{id}")
    PayOrder findPayOrderById(@PathVariable(value = "id") Long id){return payOrderRepository.getReferenceById(id);}

    @GetMapping("/withoutPayment/{page}")
    Page<PayOrder> myWithoutPayment(@PathVariable(value = "page") int page,@RequestParam(name = "tel") String tel){
        String str = "+"+tel;
        return payOrderRepository.findWithoutPaymentByTel(str,PageRequest.of(page,10));
    }

    @PostMapping("/insertPayOrder")
    void insertPayOrder(@RequestBody PayOrder payOrder){payOrderRepository.save(payOrder);}

    @PostMapping("/payPayOrder")
    void updatePayOrder(@RequestBody PayOrder payOrder){
        PayOrder payOrder1 = payOrderRepository.getReferenceById(payOrder.getId());
        payOrder1.setPay(true);
        payOrderRepository.save(payOrder1);
        Apply apply = applyRepository.getReferenceById(repairRepository.getReferenceById(payOrder1.getRepairId()).getApplyId());
        apply.setState("finish");
        applyRepository.save(apply);
    }

    @PostMapping("/deletePayOrderById/{id}")
    void deletePayOrder(@PathVariable(value = "id") Long id){
        PayOrder payOrder = payOrderRepository.getReferenceById(id);
        payOrder.setDelete(true);
        payOrderRepository.save(payOrder);
    }
}
