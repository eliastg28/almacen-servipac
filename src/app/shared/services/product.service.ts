import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const USER_AUTH_API_URL = 'https://nodejs-almacen.herokuapp.com/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  createProduct(name: string, supplier_id: number, category_id: number, warehouse_id: number, stock: number, rack: number, level: number) {
    return this.http.post(
      `${USER_AUTH_API_URL}/product`,
      {
        name,
        supplier_id,
        category_id,
        warehouse_id,
        stock,
        rack,
        level
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );

  }

  getAllProduct() {
    return this.http.get(
      `${USER_AUTH_API_URL}/product`
    );
  }

  getProductById(id: number) {
    return this.http.get(
      `${USER_AUTH_API_URL}/product/${id}`
    );
  }

  updateProduct(id: number, name: string, supplier_id: number, category_id: number, warehouse_id: number, stock: number, rack: number, level: number) {
    return this.http.put(
      `${USER_AUTH_API_URL}/product/${id}`,
      {
        name,
        supplier_id,
        category_id,
        warehouse_id,
        stock,
        rack,
        level
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(
      `${USER_AUTH_API_URL}/product/${id}`/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  getRackAndLevel(id: number) {
    return this.http.get(
      `${USER_AUTH_API_URL}/rack/warehouse/${id}`
    );
  }

}
