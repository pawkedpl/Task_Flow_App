import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  weekDays: any[] = [];
  bars: any[] = [];
  loading = false;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadWeek();
  }

  loadWeek() {
    this.loading = true;

    const today = new Date();

    const start = new Date(today);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const startStr = this.formatDate(start);
    const endStr = this.formatDate(end);

    this.api.getWeekTasks(startStr, endStr).subscribe({
      next: (tasks: any[]) => {
        console.log('TASKS:', tasks);

        this.mapDays(start);
        this.bars = this.buildBars(tasks, start);

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  mapDays(start: Date) {
      this.weekDays = [];

      for (let i = 0; i < 7; i++) {
        const day = new Date(start);
        day.setDate(start.getDate() + i);

        this.weekDays.push({
          date: this.formatDate(day),
          name: day.toLocaleDateString('en-US', { weekday: 'short' }) + ' '
        });
      }
    }

  buildBars(tasks: any[], start: Date) {
    const bars: any[] = [];

    tasks.forEach(t => {
      if (!t.startDate) return;

      const startStr = t.startDate.split('T')[0];
      const endStr = t.endDate ? t.endDate.split('T')[0] : startStr;

      const startDate = new Date(startStr);
      const endDate = new Date(endStr);

      const startIndex = Math.max(
        0,
        Math.floor((startDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      );

      const endIndex = Math.min(
        6,
        Math.floor((endDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      );

      const length = endIndex - startIndex + 1;

      bars.push({
        id: t.id,
        title: t.title,
        status: t.status,
        startIndex,
        length
      });
    });

    return bars;
  }

  markDone(task: any) {
    const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';

    this.api.updateTaskStatus(task.id, newStatus).subscribe(() => {
      this.loadWeek();
    });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}

