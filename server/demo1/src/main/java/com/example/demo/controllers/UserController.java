package com.example.demo.controllers;

import com.example.demo.models.User;
import com.example.demo.repository.UserRepo;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/logon")
    public Object logon(@RequestBody String info) throws ParseException, net.minidev.json.parser.ParseException {

        Object obj = new JSONParser().parse(info); // Object obj = new JSONParser().parse(new FileReader("JSONExample.json"));
        JSONObject jo = (JSONObject) obj;
        String user = (String) jo.get("user");
        String pass = (String) jo.get("pass");

        userRepo.getByLogin(user);

        return userRepo.getByLogin(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    @PostMapping("/saveUser")
    public void saveUser(@RequestBody User user){
        System.out.println(user.toString());
        userRepo.saveAndFlush(user);
    }
}
