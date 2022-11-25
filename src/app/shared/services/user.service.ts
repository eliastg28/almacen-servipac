import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Rol {
  id: number;
  descripcion: string;
}

const USER_AUTH_API_URL = 'https://almacen-servipac.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(
      `${USER_AUTH_API_URL}/users` /* , { headers: { Authorization: localStorage.getItem('token') } } */
    );
  }

  postUser(username: string, email: string, password: string, role: number) {
    return this.http.post(
      `${USER_AUTH_API_URL}/users/create`,
      {
        username,
        email,
        password,
        role,
      }
       /* , { headers: { Authorization: localStorage.getItem('token') } } */
    );
  }

  deleteUser(id: number) {
    return this.http.delete(
      `${USER_AUTH_API_URL}/users/delete/${id}` /* , { headers: { Authorization: localStorage.getItem('token') } } */
    );
  }

  editUser(id: number, username: string, email: string, role: number) {
    return this.http.put(
      `${USER_AUTH_API_URL}/users/update/${id}`,
      {
        username,
        email,
        role,
      } /* , { headers: { Authorization: localStorage.getItem('token') } } */
    );
  }
}
