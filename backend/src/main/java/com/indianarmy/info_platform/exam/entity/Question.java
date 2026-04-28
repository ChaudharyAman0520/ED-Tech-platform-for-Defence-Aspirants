package com.indianarmy.info_platform.exam.entity;

import com.indianarmy.info_platform.nda.entity.NDASubject;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "exam_questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 2000)
    private String text;

    @Column(nullable = false)
    private String optionA;

    @Column(nullable = false)
    private String optionB;

    @Column(nullable = false)
    private String optionC;

    @Column(nullable = false)
    private String optionD;

    @Column(nullable = false)
    private String correctAnswer; // A, B, C, D

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private NDASubject subject;

    private String difficulty; // EASY, MEDIUM, HARD

    private Integer marks = 1;
}