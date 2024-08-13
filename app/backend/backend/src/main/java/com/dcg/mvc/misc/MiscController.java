package com.dcg.mvc.misc;

import com.dcg.model.AdminDashboardStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/misc")
public class MiscController {
    @Autowired
    MiscService miscService;
    @GetMapping("/stats")
    public ResponseEntity<AdminDashboardStats> getAdminDashboardStats(){
        return ResponseEntity.ok().body(miscService.getAdminDashboardStats());
    }

}
