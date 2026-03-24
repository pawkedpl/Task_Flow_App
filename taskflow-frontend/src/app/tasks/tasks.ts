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
    window.location.href = '/login';
  }

  loadTasks() {
    this.api.getTasks().subscribe({
      next: (res: any) => {
        this.tasks = res;
      },
      error: (err) => {
        console.error('LOAD ERROR:', err);
      }
    });
  }

  deleteTask(id: number) {
    this.api.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      },
      error: (err) => {
        console.error('DELETE ERROR:', err);
        alert('Error deleting task');
      }
    });
  }
  showToast(msg: string) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerText = msg;
    document.body.appendChild(t);

    setTimeout(() => t.remove(), 3000);
  }

  addTask() {
    if (!this.newTask.title.trim()) return;

    this.api.createTask(this.newTask).subscribe({
      next: () => {
        this.loadTasks();
        this.newTask = { title: '', description: '', completed: false };
      },
      error: (err) => {
        console.error('CREATE ERROR:', err);
        alert('Error creating task');
      }
    });
  }
}
