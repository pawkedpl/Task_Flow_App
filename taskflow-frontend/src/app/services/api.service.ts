import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://api.taskify.pl/api';

  constructor(private http: HttpClient) {}

  login(data: any) {
      return this.http.post(`${this.baseUrl}/auth/login`, data, {
        responseType: 'text'
      });
  }
  register(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data, {
      responseType: 'text'
    });
  }
  getWeekTasks(start: string, end: string) {
    return this.http.get<any[]>(`${this.baseUrl}/tasks/week?start=${start}&end=${end}`, this.getAuthHeaders());
  }
  getTasks() {
    return this.http.get<any[]>(`${this.baseUrl}/tasks`, this.getAuthHeaders());
  }
  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`, this.getAuthHeaders());
  }
  createTask(task: any) {
    return this.http.post(`${this.baseUrl}/tasks`, task, this.getAuthHeaders());
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
}
