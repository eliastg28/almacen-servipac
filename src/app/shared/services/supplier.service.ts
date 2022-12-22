import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const USER_AUTH_API_URL = 'https://nodejs-almacen.herokuapp.com/api/v1';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) {}

  createSupplier(ruc: string, company_name: string, address: string, phone: string, email: string) {
    return this.http.post(
      `${USER_AUTH_API_URL}/supplier`,
      {
        ruc,
        company_name,
        address,
        phone,
        email
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  getAllSuppliers() {
    return this.http.get(
      `${USER_AUTH_API_URL}/supplier`
    );
  }

  getSupplierById(id: number) {
    return this.http.get(
      `${USER_AUTH_API_URL}/supplier/${id}`
    );
  }

  updateSupplier(id: number, ruc: string, company_name: string, address: string, phone: string, email: string) {
    return this.http.put(
      `${USER_AUTH_API_URL}/supplier/${id}`,
      {
        ruc,
        company_name,
        address,
        phone,
        email
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  deleteSupplier(id: number) {
    return this.http.delete(
      `${USER_AUTH_API_URL}/supplier/${id}`/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

}
