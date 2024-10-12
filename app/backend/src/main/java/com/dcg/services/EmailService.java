package com.dcg.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@EnableAsync // Enable asynchronous processing
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async // Run this method asynchronously
    public CompletableFuture<Void> sendPasswordChangeEmail(String to, String token) {
        String subject = "Password Change Request";
        String text = createPasswordChangeEmailBody(token);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return CompletableFuture.completedFuture(null);
    }

    @Async // Run this method asynchronously
    public CompletableFuture<Void> sendPaymentDetailsEmail(String to, String paymentId, String orderId, double amount, String status) {
        String subject = "Payment Confirmation";
        String text = createPaymentDetailsEmailBody(paymentId, orderId, amount, status);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return CompletableFuture.completedFuture(null);
    }

    @Async // Run this method asynchronously
    public CompletableFuture<Void> sendNewsletterSubscriptionEmail(String name, String to) {
        String subject = "Thank You for Subscribing!";
        String text = createNewsletterSubscriptionEmailBody(name);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return CompletableFuture.completedFuture(null);
    }

    private String createPasswordChangeEmailBody(String token) {
        // HTML content for password change email
        return "<html>" +
                "<body style='font-family: Arial, sans-serif;'>" +
                "<div style='max-width: 600px; margin: auto; padding: 20px;'>" +
                "<h2 style='color: #333;'>Password Change Request</h2>" +
                "<p style='font-size: 16px;'>Hello,</p>" +
                "<p style='font-size: 16px;'>To change your password, please click the link below:</p>" +
                "<p><a href='http://localhost:4200/auth/user/reset-password?token=" + token +
                "' style='background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Reset Password</a></p>" +
                "<p style='font-size: 16px;'>If you did not request this change, please ignore this email.</p>" +
                "<p style='font-size: 14px; color: #888;'>Thank you,<br>DCG</p>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

    private String createPaymentDetailsEmailBody(String paymentId, String orderId, double amount, String status) {
        // HTML content for payment details email
        return "<html>" +
                "<body style='font-family: Arial, sans-serif;'>" +
                "<div style='max-width: 600px; margin: auto; padding: 20px;'>" +
                "<h2 style='color: #333;'>Payment Confirmation</h2>" +
                "<p style='font-size: 16px;'>Hello,</p>" +
                "<p style='font-size: 16px;'>Thank you for your payment. Here are the details:</p>" +
                "<table style='width: 100%; border-collapse: collapse;'>" +
                "<tr>" +
                "<td style='padding: 10px; border: 1px solid #ddd;'>Payment ID:</td>" +
                "<td style='padding: 10px; border: 1px solid #ddd;'>" + paymentId + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td style='padding: 10px; border: 1px solid #ddd;'>Order ID:</td>" +
                "<td style='padding: 10px; border: 1px solid #ddd;'>" + orderId + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td style='padding: 10px; border: 1px solid #ddd;'>Amount:</td>" +
                "<td style='padding: 10px; border: 1px solid #ddd;'>" + amount + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td style='padding: 10px; border: 1px solid #ddd;'>Status:</td>" +
                "<td style='padding: 10px; border: 1px solid #ddd;'>" + status + "</td>" +
                "</tr>" +
                "</table>" +
                "<p style='font-size: 16px;'>If you have any questions regarding this payment, please contact us.</p>" +
                "<p style='font-size: 14px; color: #888;'>Thank you,<br>DCG</p>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

    private String createNewsletterSubscriptionEmailBody(String name) {
        // HTML content for newsletter subscription email
        return "<html>" +
                "<body style='font-family: Arial, sans-serif;'>" +
                "<div style='max-width: 600px; margin: auto; padding: 20px;'>" +
                "<h2 style='color: #333;'>Thank You for Subscribing!</h2>" +
                "<p style='font-size: 16px;'>Hello " + name + ",</p>" +
                "<p style='font-size: 16px;'>Thank you for subscribing to our newsletter! We're excited to have you on board.</p>" +
                "<p style='font-size: 16px;'>Stay tuned for updates, news, and exclusive offers.</p>" +
                "<p style='font-size: 14px; color: #888;'>Best regards,<br>DeepCodecGuru</p>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
    @Async // Run this method asynchronously
    public CompletableFuture<Void> sendCouponEmail(String to, String couponCode, double discountPercentage) {
        String subject = "Exclusive Coupon Code Just for You!";
        String text = createCouponEmailBody(couponCode, discountPercentage);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return CompletableFuture.completedFuture(null);
    }

    private String createCouponEmailBody(String couponCode, double discountPercentage) {
        return "<html>" +
                "<body style='font-family: Arial, sans-serif;'>" +
                "<div style='max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;'>" +
                "<h2 style='color: #333;'>🎉 Special Offer Just for You!</h2>" +
                "<p style='font-size: 16px;'>Hello,</p>" +
                "<p style='font-size: 16px;'>We're excited to share an exclusive coupon code that gives you <strong>" +
                discountPercentage + "% off</strong> on your next purchase!</p>" +
                "<h3 style='color: #007bff;'>Your Coupon Code:</h3>" +
                "<h2 style='background-color: #007bff; color: #fff; padding: 10px; text-align: center;'>" + couponCode + "</h2>" +
                "<p style='font-size: 16px;'>Use this code at checkout to enjoy your discount.</p>" +
                "<p style='font-size: 16px;'>Hurry, this offer is valid for a limited time only!</p>" +
                "<p style='font-size: 14px; color: #888;'>Thank you,<br>DeepCodecGuru</p>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

}
