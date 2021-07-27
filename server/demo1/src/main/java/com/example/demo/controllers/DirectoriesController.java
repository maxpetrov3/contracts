package com.example.demo.controllers;


import com.example.demo.models.Contragent;
import com.example.demo.models.PayRule;
import com.example.demo.models.User;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/v1/")
public class DirectoriesController {

    @Autowired
    private StatusRepo statusRepo;

    @Autowired
    private DirectionsRepo directionsRepo;

    @Autowired
    private ContragentsRepo contragentsRepo;

    @Autowired
    private CurrencyRepo currencyRepo;

    @Autowired
    private PayRulesRepo payRulesRepo;

    @Autowired
    private FmPositionRepo fmPositionRepo;

    @Autowired
    private KreditorsRepo kreditorsRepo;

    @Autowired
    private TenderRepo tenderRepo;

    @Autowired
    private CostTypeRepo costTypeRepo;

    @Autowired
    private DisProtocolRepo disProtocolRepo;

    @Autowired
    private PostPayRepo postPayRepo;

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/statuses")
    public Object getAllStatuses(){
        return statusRepo.findAll();
    }

    @GetMapping("/directions")
    public Object getAllDirections(){
        return directionsRepo.findAll();
    }

    @GetMapping("/contragents")
    public Object getAllContragents(){
        return contragentsRepo.findAll();
    }

    @PostMapping("/saveContragent")
    public void saveContragent(@RequestBody Contragent contragent){
        contragentsRepo.saveAndFlush(contragent);
    }

    @PostMapping("/serchContragent")
    public Object serchContraget(@RequestBody String text){
        text = text.replace("=", "");
        return contragentsRepo.serchContragent(text);
    }

    @GetMapping("/currency")
    public Object getAllCurency(){return  currencyRepo.findAll(); }

    @GetMapping("/payrules")
    public Object getAllPayRules(){return payRulesRepo.findAll(); }

    @PostMapping("/savePayRule")
    public void savePayRule(@RequestBody PayRule payRule){
        payRulesRepo.saveAndFlush(payRule);
    }

    @PostMapping("/searchPayRule")
    public Object searchPayRule(@RequestBody String text){
        return payRulesRepo.searchPayRule(text);
    }

    @GetMapping("/fmpos")
    public Object getAllFmPositions(){return fmPositionRepo.findAll(); }

    @GetMapping("/kreditors")
    public Object getAllKreditors(){return kreditorsRepo.findAll(); }

    @GetMapping("/tenders")
    public Object getAllTendes(){return tenderRepo.findAll(); }

    @GetMapping("/costtypes")
    public Object getAllCostTypes(){return costTypeRepo.findAll(); }

    @GetMapping("/dispr")
    public Object getAllDisProtocols(){return disProtocolRepo.findAll(); }

    @GetMapping("/postpays")
    public Object getAllPostPays(){return postPayRepo.findAll(); }

    @GetMapping("/executors")
    public Object getAllExecutors(){return userRepo.findAll(); }
}
