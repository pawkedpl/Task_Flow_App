import { Component, AfterViewInit } from '@angular/core';
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
export class LoginComponent implements AfterViewInit {

  email: string = '';
  password: string = '';

  isRegister: boolean = false;

  constructor(private api: ApiService, private router: Router) {}

  ngAfterViewInit() {
    const canvas = document.getElementById('stars') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: any[] = [];

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => {
        s.y += s.speed;

        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

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

  toggleMode() {
    this.isRegister = !this.isRegister;
  }
}
