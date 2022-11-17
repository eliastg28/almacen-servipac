import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const USER_AUTH_API_URL = 'http://almacen-servipac.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  getRol() {
    return this.http.get(`${USER_AUTH_API_URL}/roles`, { headers: { Authorization: localStorage.getItem('token') } });
  }

  postRol(name:string){
    return this.http.post(`${USER_AUTH_API_URL}/roles`, {name}, { headers: { Authorization: localStorage.getItem('token') } });
  }

  deleteRol(id:number){
    return this.http.delete(`${USER_AUTH_API_URL}/roles/${id}`, { headers: { Authorization: localStorage.getItem('token') } });
  }

  editRol(id:number, name:string){
    return this.http.put(`${USER_AUTH_API_URL}/roles/${id}`, {name}, { headers: { Authorization: localStorage.getItem('token') } });
  }

}
