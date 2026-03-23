import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html'
})
export class TasksComponent implements OnInit {

  tasks: any[] = [];
  newTask = { title: '', description: '', completed: false };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadTasks();
  }
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  loadTasks() {
    this.api.getTasks().subscribe((res: any) => {
      this.tasks = res;
    });
  }
  deleteTask(id: number) {
    this.api.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }
  addTask() {
    this.api.createTask(this.newTask).subscribe(() => {
      this.loadTasks();
      this.newTask = { title: '', description: '', completed: false };
    });
  }
}
