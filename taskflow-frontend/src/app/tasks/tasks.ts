import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent implements OnInit {

  tasks: any[] = [];
  loading = false;

  newTask = {
    title: '',
    startDate: '',
    endDate: '',
    status: 'TODO'
  };

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;

    this.api.getTasks().subscribe({
      next: (res: any) => {
        console.log('API RESPONSE:', res);

        this.tasks = res;
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
  toggleStatus(task: any) {
    const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';

    this.api.updateTaskStatus(task.id, newStatus).subscribe(() => {
      task.status = newStatus;

      this.cdr.detectChanges();
    });
  }

  addTask() {
    if (!this.newTask.title.trim()) return;

    this.api.createTask(this.newTask).subscribe(() => {
      this.loadTasks();


      this.newTask = {
        title: '',
        startDate: '',
        endDate: '',
        status: 'TODO'
      };
    });
  }

  deleteTask(id: number) {
    this.api.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.cdr.detectChanges();
    });
  }
}
