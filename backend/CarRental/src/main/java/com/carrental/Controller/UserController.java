package com.carrental.Controller;

import com.carrental.Model.User;
import com.carrental.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class UserController {

    @Autowired
    private UserRepo userRepo;

    // ✅ Total User Count
    @GetMapping("/count")
    public Map<String, Integer> getTotalUsers() {
        int totalUsers = userRepo.findAll().size();
        return Collections.singletonMap("totalUsers", totalUsers);
    }
}
