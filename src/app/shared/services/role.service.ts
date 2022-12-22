import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const USER_AUTH_API_URL = 'https://nodejs-almacen.herokuapp.com/api/v1';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRol() {
    return this.http.get(
      `${USER_AUTH_API_URL}/role`
    );
  }

  postRol(name: string, description: string) {
    return this.http.post(
        `${USER_AUTH_API_URL}/role`,
      {
        name,
        description
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  deleteRol(id: number) {
    return this.http.delete(
      `${USER_AUTH_API_URL}/role/${id}`/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  editRol(id: number, name: string, description: string) {
    return this.http.put(
      `${USER_AUTH_API_URL}/role/${id}`,
      {
        name,
        description
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }
}
