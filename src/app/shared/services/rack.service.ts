import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const USER_AUTH_API_URL = 'http://localhost:5000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class RackService {

  constructor(private http: HttpClient) {}

  createRack(name: string, levels: number, warehouse_id: number) {
    return this.http.post(
      `${USER_AUTH_API_URL}/rack`,
      {
        name,
        levels,
        warehouse_id
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );

  }

  getAllRack() {
    return this.http.get(
      `${USER_AUTH_API_URL}/rack`
    );
  }

  getRackById(id: number) {
    return this.http.get(
      `${USER_AUTH_API_URL}/rack/${id}`
    );
  }

  updateRack(id: number, name: string, levels: number, warehouse_id: number) {
    return this.http.put(
      `${USER_AUTH_API_URL}/rack/${id}`,
      {
        name,
        levels,
        warehouse_id
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  deleteRack(id: number) {
    return this.http.delete(
      `${USER_AUTH_API_URL}/rack/${id}`/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

}
