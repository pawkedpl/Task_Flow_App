package com.taskflow.backend.repository;

import com.taskflow.backend.model.Task;
import com.taskflow.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // 🔥 wszystkie taski usera
    List<Task> findByUserId(Long userId);
    List<Task> findByUser(User user);
    // 🔥 taski w zakresie czasu (dashboard)
    List<Task> findByUserIdAndStartDateBetween(
            Long userId,
            LocalDateTime start,
            LocalDateTime end
    );
}