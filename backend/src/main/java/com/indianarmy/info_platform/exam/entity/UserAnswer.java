package com.indianarmy.info_platform.exam.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "exam_user_answers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "attempt_id")
    private Attempt attempt;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    private String selectedAnswer;

    private Boolean isCorrect;
}