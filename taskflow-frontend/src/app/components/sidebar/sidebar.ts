import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {

  collapsed = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  toggleTheme() {
    document.body.classList.toggle('dark');
  }
}

