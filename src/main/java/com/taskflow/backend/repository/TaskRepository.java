package com.taskflow.backend.repository;

import com.taskflow.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserId(Long userId);

    // (obsługuje multi-day!)
    @Query("""
        SELECT t FROM Task t
        WHERE t.user.id = :userId
        AND t.startDate <= :end
        AND t.endDate >= :start
    """)
    List<Task> findTasksForWeek(
            Long userId,
            LocalDateTime start,
            LocalDateTime end
    );
}

