import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  weekDays: any[] = [];

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadWeek();
  }

  loadWeek() {
    const today = new Date();

    const start = this.getStartOfWeek(today);
    const end = this.getEndOfWeek(today);

    this.api.getTasks().subscribe((tasks: any[]) => {

      const filtered = tasks.filter(t => {
        if (!t.startDate) return false;

        const date = new Date(t.startDate);
        return date >= start && date <= end;
      });

      this.mapTasks(filtered, start);
      this.cdr.detectChanges();
    });
  }

  mapTasks(tasks: any[], start: Date) {
    this.weekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);

      const dayStr = this.formatDate(day);

      const dayTasks = tasks.filter(t => {
        return t.startDate?.startsWith(dayStr);
      });

      this.weekDays.push({
        date: dayStr,
        name: day.toLocaleDateString('en-US', { weekday: 'short' }),
        tasks: dayTasks
      });
    }
  }

  getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  getEndOfWeek(date: Date): Date {
    const start = this.getStartOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  markDone(task: any) {
    task.status = task.status === 'DONE' ? 'TODO' : 'DONE';

    this.api.createTask(task).subscribe(() => {
      this.loadWeek();
    });
  }
}

