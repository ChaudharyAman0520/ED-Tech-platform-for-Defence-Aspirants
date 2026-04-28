package com.indianarmy.info_platform.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserStatsDTO {
    private long totalUsers;
    private long adminCount;
    private long aspirantCount;
    private long recentRegistrations;
}