package com.example.demo.controller;

import com.example.demo.entity.Phone;
import com.example.demo.repository.PhoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class PhoneController {
    private final PhoneRepository phoneRepository;

    @GetMapping("/findAllPhone")
    List<Phone> findAllPhone(){return phoneRepository.findAllPhone();}

    @GetMapping("/findPhoneByOwnerId")
    List<Phone> findPhoneByOwnerId(@RequestParam(value = "ownerId") Long ownerId){return phoneRepository.findPhoneByOwnerId(ownerId);}

    @GetMapping("/findPhoneById/{id}")
    Phone findPhoneById(@PathVariable(value = "id") Long id){return phoneRepository.getReferenceById(id);}

    @PostMapping("/insertPhone")
    void insertPhone(@RequestBody Phone phone){phoneRepository.save(phone);}

    @PostMapping("/updatePhone")
    void updatePhone(@RequestBody Phone phone){
        Phone phone1 = phoneRepository.getReferenceById(phone.getId());
        phone1.setModel(phone.getModel());
        phone1.setManufacturer(phone.getManufacturer());
        phoneRepository.save(phone1);
    }

    @PostMapping("/deletePhone/{id}")
    void deletePhoneById(@PathVariable(value = "id") Long id){
        Phone phone = phoneRepository.getReferenceById(id);
        phone.setDelete(true);
        phoneRepository.save(phone);
    }
}
