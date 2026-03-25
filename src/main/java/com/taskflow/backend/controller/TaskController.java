package com.taskflow.backend.controller;

import com.taskflow.backend.model.Task;
import com.taskflow.backend.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return taskService.create(task);
    }

    @GetMapping
    public List<Task> getMyTasks() {
        return taskService.getMyTasks();
    }

    @GetMapping("/week")
    public List<Task> getWeekTasks(
            @RequestParam String start,
            @RequestParam String end
    ) {
        return taskService.getTasksForWeek(
                LocalDate.parse(start),
                LocalDate.parse(end)
        );
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task task) {
        return taskService.update(id, task);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        taskService.delete(id);
    }
}