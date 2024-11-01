package com.dcg.mvc.unit;

import com.dcg.mvc.contest.Contest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PatchMapping("/{unitId}/toggle/status")
    public ResponseEntity<Unit> toggleStatus(@PathVariable Long unitId) {
        return ResponseEntity.ok(unitService.toggleUnit(unitId));
    }

}
