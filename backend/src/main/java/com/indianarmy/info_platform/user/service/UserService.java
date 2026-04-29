package com.indianarmy.info_platform.user.service;

import com.indianarmy.info_platform.user.dto.UserDTO;
import com.indianarmy.info_platform.user.dto.UserStatsDTO;
import com.indianarmy.info_platform.missions.entity.Role;
import com.indianarmy.info_platform.user.entity.User;
import com.indianarmy.info_platform.user.UserUpdateRequest;
import com.indianarmy.info_platform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> result = new ArrayList<UserDTO>();

        for (User user : users) {
            result.add(convertToDTO(user));
        }

        return result;
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found with id: " + id);
        }

        return convertToDTO(user);
    }

    public UserDTO updateUserRole(Long id, String roleStr) {
        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found with id: " + id);
        }

        Role newRole = Role.valueOf(roleStr.toUpperCase());
        user.setRole(newRole);

        return convertToDTO(userRepository.save(user));
    }

    public UserDTO updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found with id: " + id);
        }

        if (request.getName() != null) {
            user.setName(request.getName());
        }

        if (request.getRole() != null) {
            user.setRole(Role.valueOf(request.getRole().toUpperCase()));
        }

        return convertToDTO(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found with id: " + id);
        }

        List<User> users = userRepository.findAll();
        long adminCount = 0;

        for (User u : users) {
            if (u.getRole() == Role.ADMIN) {
                adminCount++;
            }
        }

        if (user.getRole() == Role.ADMIN && adminCount <= 1) {
            throw new RuntimeException("Cannot delete the only admin user");
        }

        userRepository.deleteById(id);
    }

    public UserStatsDTO getUserStats() {
        List<User> users = userRepository.findAll();

        long totalUsers = users.size();
        long adminCount = 0;
        long aspirantCount = 0;
        long recentCount = 0;

        java.time.LocalDateTime threshold = java.time.LocalDateTime.now().minusDays(30);

        for (User u : users) {
            if (u.getRole() == Role.ADMIN) {
                adminCount++;
            }

            if (u.getRole() == Role.ASPIRANT) {
                aspirantCount++;
            }

            if (u.getCreatedAt() != null && u.getCreatedAt().isAfter(threshold)) {
                recentCount++;
            }
        }

        return new UserStatsDTO(totalUsers, adminCount, aspirantCount, recentCount);
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.getCreatedAt()
        );
    }
}