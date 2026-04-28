package com.indianarmy.info_platform.user.service;

import com.indianarmy.info_platform.user.dto.UserDTO;
import com.indianarmy.info_platform.user.dto.UserStatsDTO;
import com.indianarmy.info_platform.missions.entity.Role;
import com.indianarmy.info_platform.user.entity.User;
import com.indianarmy.info_platform.user.UserUpdateRequest;
import com.indianarmy.info_platform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return convertToDTO(user);
    }

    public UserDTO updateUserRole(Long id, String roleStr) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        Role newRole = Role.valueOf(roleStr.toUpperCase());
        user.setRole(newRole);

        return convertToDTO(userRepository.save(user));
    }

    public UserDTO updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (request.getName() != null) user.setName(request.getName());
        if (request.getRole() != null) user.setRole(Role.valueOf(request.getRole().toUpperCase()));

        return convertToDTO(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Prevent deleting the last admin
        long adminCount = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.ADMIN)
                .count();

        if (user.getRole() == Role.ADMIN && adminCount <= 1) {
            throw new RuntimeException("Cannot delete the only admin user");
        }

        userRepository.deleteById(id);
    }

    public UserStatsDTO getUserStats() {
        List<User> users = userRepository.findAll();

        long totalUsers = users.size();
        long adminCount = users.stream().filter(u -> u.getRole() == Role.ADMIN).count();
        long aspirantCount = users.stream().filter(u -> u.getRole() == Role.ASPIRANT).count();

        // Recent registrations (last 30 days)
        long recentCount = users.stream()
                .filter(u -> u.getCreatedAt() != null &&
                        u.getCreatedAt().isAfter(java.time.LocalDateTime.now().minusDays(30)))
                .count();

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