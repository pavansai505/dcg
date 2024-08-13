package com.dcg.services;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordChangeEmail(String to, String token) {
        String subject = "Password Change Request";

        // HTML content for the email
        String text = "<html>" +
                "<body style='font-family: Arial, sans-serif;'>" +
                "<div style='max-width: 600px; margin: auto; padding: 20px;'>" +
                "<h2 style='color: #333;'>Password Change Request</h2>" +
                "<p style='font-size: 16px;'>Hello,</p>" +
                "<p style='font-size: 16px;'>To change your password, please click the link below:</p>" +
                "<p><a href='http://localhost:4200/auth/user/reset-password?token=" + token +
                "' style='background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Reset Password</a></p>" +
                "<p style='font-size: 16px;'>If you did not request this change, please ignore this email.</p>" +
                "<p style='font-size: 14px; color: #888;'>Thank you,<br>Your Company</p>" +
                "</div>" +
                "</body>" +
                "</html>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true); // Set the email content as HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            // Handle exception (e.g., log it)
            e.printStackTrace();
        }
    }
}
