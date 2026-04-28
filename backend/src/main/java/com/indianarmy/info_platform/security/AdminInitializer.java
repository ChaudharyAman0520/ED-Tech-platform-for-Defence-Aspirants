package com.indianarmy.info_platform.security;

import com.indianarmy.info_platform.missions.entity.Role;
import com.indianarmy.info_platform.user.entity.User;
import com.indianarmy.info_platform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String adminEmail = "rohit@gmail.com";

        if (userRepository.findByEmail(adminEmail).isEmpty()) {

            User admin = User.builder()
                    .name("Rohit Dhyani")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("rohit123"))
                    .role(Role.ADMIN)
                    .createdAt(LocalDateTime.now())
                    .build();

            userRepository.save(admin);

            System.out.println("Admin account created successfully.");
        }
    }
}