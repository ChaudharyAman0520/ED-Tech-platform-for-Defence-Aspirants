package com.indianarmy.info_platform.missions.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "military_operations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MilitaryOperation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String operationName;

    @Column(nullable = false)
    private String year;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, length = 2000)
    private String objective;

    @Column(nullable = false, length = 2000)
    private String outcome;

    @Column(nullable = false)
    private boolean featured;   // ⭐ for landing page
}
