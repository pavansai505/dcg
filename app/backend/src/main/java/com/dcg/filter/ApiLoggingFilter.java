package com.dcg.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class ApiLoggingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // Ensure that the request is an instance of HttpServletRequest to access more information
        if (request instanceof HttpServletRequest httpRequest) {
            // Log the API call information
            System.out.println("API Call: "  + httpRequest.getRequestURI());
        }

        // Continue with the request
        chain.doFilter(request, response);
    }
}
