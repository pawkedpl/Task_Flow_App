package com.taskflow.backend.service;

import com.taskflow.backend.model.Task;
import com.taskflow.backend.repository.TaskRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public Task create(Task task) {
        task.setUserEmail(getCurrentUserEmail());
        return taskRepository.save(task);
    }

    public List<Task> getMyTasks() {
        return taskRepository.findByUserEmail(getCurrentUserEmail());
    }

    public Task update(Long id, Task updatedTask) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // 🔐 sprawdzamy właściciela
        if (!task.getUserEmail().equals(getCurrentUserEmail())) {
            throw new RuntimeException("Access denied");
        }

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setCompleted(updatedTask.isCompleted());

        return taskRepository.save(task);
    }

    public void delete(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // 🔐 sprawdzamy właściciela
        if (!task.getUserEmail().equals(getCurrentUserEmail())) {
            throw new RuntimeException("Access denied");
        }

        taskRepository.delete(task);
    }
}