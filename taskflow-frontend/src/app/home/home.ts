import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  completed = 0;
  total = 0;
  overdue = 0;

  todayTasks: any[] = [];

  loading = false;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.api.getTasks().subscribe({
      next: (tasks: any[]) => {
        console.log('HOME TASKS:', tasks);

        const now = new Date();
        const todayStr = this.formatDate(now);

        // 🔥 STATS
        this.total = tasks.length;

        this.completed = tasks.filter(t => t.status === 'DONE').length;

        this.overdue = tasks.filter(t =>
          t.status !== 'DONE' &&
          new Date(t.endDate) < now
        ).length;

        // 🔥 TODAY TASKS
        this.todayTasks = tasks.filter(t => {
          const start = t.startDate?.split('T')[0];
          const end = t.endDate?.split('T')[0];

          return start && end && start <= todayStr && end >= todayStr;
        });

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  refresh() {
    this.loadData();
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}

