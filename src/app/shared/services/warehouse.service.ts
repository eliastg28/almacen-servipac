import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const USER_AUTH_API_URL = 'http://localhost:5000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) {}

  createWarehouse(name: string) {
    return this.http.post(
      `${USER_AUTH_API_URL}/warehouse`,
      {
        name
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  getAllWarehouses() {
    return this.http.get(
      `${USER_AUTH_API_URL}/warehouse`
    );
  }

  getWarehouseById(id: number) {
    return this.http.get(
      `${USER_AUTH_API_URL}/warehouse/${id}`
    );
  }

  updateWarehouse(id: number, name: string) {
    return this.http.put(
      `${USER_AUTH_API_URL}/warehouse/${id}`,
      {
        name
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  deleteWarehouse(id: number) {
    return this.http.delete(
      `${USER_AUTH_API_URL}/warehouse/${id}`/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

}
