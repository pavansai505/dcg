package com.dcg.mvc.faq;

import com.dcg.response.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FAQService {

    @Autowired
    private FAQRepository faqRepository;

    public List<FAQ> getAllFAQs() {
        return faqRepository.findAll();
    }
    public FAQ getFAQById(Long id) {
        return faqRepository.findById(id).orElse(null);
    }
    @Secured("ROLE_ADMIN")
    public void addFAQ(List<FAQ> faq) {
        faq.forEach(faq1 -> faqRepository.save(faq1));
    }
    @Secured("ROLE_ADMIN")
    public void deleteFAQ(Long id) {
        faqRepository.deleteById(id);
    }
}
