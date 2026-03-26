package com.taskflow.backend.controller;

import com.taskflow.backend.model.Task;
import com.taskflow.backend.service.TaskService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // ✅ GET tasks dla zalogowanego użytkownika
    @GetMapping
    public List<Task> getTasks(Authentication authentication) {
        String email = authentication.getName();
        return taskService.getTasksByUser(email);
    }

    // ✅ CREATE task
    @PostMapping
    public Task create(@RequestBody Task task, Authentication authentication) {
        String email = authentication.getName();
        return taskService.create(task, email);
    }

    // ✅ DELETE task
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        taskService.delete(id, email);
    }
}