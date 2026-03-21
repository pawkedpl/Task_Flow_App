import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login({
      email: this.email,
      password: this.password
    }).subscribe(
      (res: any) => {
        // 🔐 zapis tokena
        localStorage.setItem('token', res);

        // 🚀 przekierowanie
        this.router.navigate(['/tasks']);
      },
      (err: any) => {
        alert('Login failed');
        console.error(err);
      }
    );
  }
}
