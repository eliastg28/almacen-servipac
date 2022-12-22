import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Rol {
  id: number;
  descripcion: string;
}

const USER_AUTH_API_URL = 'https://nodejs-almacen.herokuapp.com/api/v1';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(
      `${USER_AUTH_API_URL}/user`
    );
  }

  createUser(username: string, password: string, email: string, status:boolean, role: number){
    return this.http.post(
      `${USER_AUTH_API_URL}/auth/register`,
      {
        username,
        password,
        email,
        status,
        role
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }


  getUserById(id: string) {
    return this.http.get(
      `${USER_AUTH_API_URL}/user/${id}`
    );
  }

  deleteUser(id: number) {
    return this.http.delete(
      `${USER_AUTH_API_URL}/user/${id}`/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  editUser(id: number,username: string, email: string, status:boolean, role: number) {
    return this.http.put(
      `${USER_AUTH_API_URL}/user/${id}`,
      {
        username,
        email,
        status,
        role
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }
}
