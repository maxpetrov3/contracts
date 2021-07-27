package com.example.demo.controllers;



import com.example.demo.models.Contract;
import com.example.demo.models.ContractTask;
import com.example.demo.models.TaskComment;
import com.example.demo.repository.ContractRepo;
import com.example.demo.repository.ContractTaskRepo;
import com.example.demo.repository.TaskComentRepo;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Comparator;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class ContractController {

    @Autowired
    private ContractRepo contractRepo;

    @Autowired
    private ContractTaskRepo contractTaskRepo;

    @Autowired
    private TaskComentRepo taskComentRepo;


    @GetMapping("/contracts")
    public Object allContracts(){
        return contractRepo.findAll();
    }

    @PostMapping("/contractsByUser")
    public Object getContraactsByUser(@RequestBody String user){
        user = user.replace("=", "");
        System.out.println(user);
        String finalUser = user;
        return contractRepo.findAll().stream().filter(i -> i.getExecutor().getId() == Long.valueOf(finalUser));
    }

    @PostMapping("/serchContracts")
    public Object serchIt(@RequestBody String text){
        text = text.replace("=", "");
            return contractRepo.serchContract(text);
    }

    @PostMapping("/contractTasks")
    public Object getContractTasks(@RequestBody String contractId){
        contractId = contractId.replace("=", "");
        contractId = contractId.replace("+", "");
        return  contractTaskRepo.getContractTasks(contractId);
    }

    @GetMapping("/allTasks")
    public Object getAllTasks(){
        return  contractTaskRepo.findAll().stream()
                .sorted(Comparator.comparing(ContractTask::getEndDate))
                .collect(Collectors.toList());
    }

    @PostMapping("/saveTask")
    public void addContractTask(@RequestBody ContractTask task){
        contractTaskRepo.saveAndFlush(task);
    }

    @PostMapping("/saveTaskComment")
    public void saveTaskComment(@RequestBody TaskComment comment){
        taskComentRepo.saveAndFlush(comment);
    }

    @PostMapping("/saveContract")
    public void saveContract(@RequestBody Contract contract){
        contractRepo.saveAndFlush(contract);
    }


}

