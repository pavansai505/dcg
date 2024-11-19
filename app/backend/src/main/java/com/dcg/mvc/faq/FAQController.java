package com.dcg.mvc.faq;

import com.dcg.response.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/faq")
public class FAQController {

    @Autowired
    private FAQService faqService;

    @GetMapping("/get")
    public ResponseEntity<List<FAQ>> getAllFAQs() {
        List<FAQ> faqs = faqService.getAllFAQs();
        return ResponseEntity.ok(faqs);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<FAQ> getFAQById(@PathVariable Long id) {
        FAQ faq = faqService.getFAQById(id);
        return ResponseEntity.ok(faq);
    }

    @PostMapping("/add")
    public ResponseEntity<CustomResponse> addFAQ(@RequestBody List<FAQ> faq) {
        faqService.addFAQ(faq);
        CustomResponse response = CustomResponse.builder().message("Added FAQ(s) successfully").build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFAQ(@PathVariable Long id) {
        faqService.deleteFAQ(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(Arrays.asList(Category.values()));
    }
}
