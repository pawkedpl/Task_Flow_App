import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  completed = 0;
  total = 0;
  overdue = 0;

  loading = false;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;

    this.api.getTasks().subscribe({
      next: (tasks: any[]) => {
        console.log('HOME TASKS:', tasks);

        this.total = tasks.length;

        const now = new Date();

        this.completed = tasks.filter(t => t.status === 'DONE').length;

        this.overdue = tasks.filter(t =>
          t.status !== 'DONE' &&
          new Date(t.endDate) < now
        ).length;

        this.loading = false;

        // 🔥 KLUCZOWE
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 🔥 opcjonalnie: ręczny refresh
  refresh() {
    this.loadStats();
  }
}
