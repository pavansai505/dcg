package com.dcg.mvc.unit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/unit")
public class UnitController {
    @Autowired
    public UnitService unitService;

    @PutMapping("/bulk-update")
    public ResponseEntity<List<Unit>> updateUnits(@RequestBody List<Unit> updatedUnits) {
        List<Unit> updated = unitService.updateUnits(updatedUnits);
        return ResponseEntity.ok(updated);
    }

}
