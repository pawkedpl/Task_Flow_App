import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent implements OnInit {

  collapsed = false;

  ngOnInit() {
    const saved = localStorage.getItem('sidebarCollapsed');
    this.collapsed = saved === 'true';

    this.checkScreen();
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    localStorage.setItem('sidebarCollapsed', String(this.collapsed));
  }


  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }

  checkScreen() {
    if (window.innerWidth < 768) {
      this.collapsed = true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  toggleTheme() {
    document.body.classList.toggle('dark');
  }
}

