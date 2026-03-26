import { Component, OnInit } from '@angular/core';
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

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTasks().subscribe((tasks: any[]) => {
      this.total = tasks.length;

      const now = new Date();

      this.completed = tasks.filter(t => t.status === 'DONE').length;

      this.overdue = tasks.filter(t =>
        t.status !== 'DONE' &&
        new Date(t.endDate) < now
      ).length;
    });
  }
}
