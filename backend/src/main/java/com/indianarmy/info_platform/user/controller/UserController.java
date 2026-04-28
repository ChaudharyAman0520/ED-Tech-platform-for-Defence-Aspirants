package com.indianarmy.info_platform.user.controller;

import com.indianarmy.info_platform.user.RoleUpdateRequest;
import com.indianarmy.info_platform.user.UserUpdateRequest;
import com.indianarmy.info_platform.user.dto.UserDTO;
import com.indianarmy.info_platform.user.dto.UserStatsDTO;
import com.indianarmy.info_platform.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    // Get all users (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Update user role (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/role")
    public UserDTO updateUserRole(@PathVariable Long id, @RequestBody RoleUpdateRequest request) {
        return userService.updateUserRole(id, request.getRole());
    }

    // Update user details (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable Long id, @RequestBody UserUpdateRequest request) {
        return userService.updateUser(id, request);
    }

    // Delete user (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }

    // Get user statistics (ADMIN only)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/stats")
    public UserStatsDTO getUserStats() {
        return userService.getUserStats();
    }
}