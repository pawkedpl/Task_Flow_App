import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  isRegister: boolean = false; // 🔥 tryb

  constructor(private api: ApiService, private router: Router) {}

  submit() {
    if (this.isRegister) {
      this.register();
    } else {
      this.login();
    }
  }

  login() {
    this.api.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.toString());
        this.router.navigate(['/tasks']);
      },
      error: () => {
        alert('Login failed');
      }
    });
  }

  register() {
    this.api.register({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.toString());
        this.router.navigate(['/tasks']);
      },
      error: () => {
        alert('Register failed');
      }
    });
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/tasks']);
    }
  }
  toggleMode() {
    this.isRegister = !this.isRegister;
  }
}
