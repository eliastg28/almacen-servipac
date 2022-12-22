import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const USER_AUTH_API_URL = 'http://localhost:5000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  createCategory(name: string, description: string) {
    return this.http.post(
      `${USER_AUTH_API_URL}/category`,
      {
        name,
        description
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  getAllCategories() {
    return this.http.get(
      `${USER_AUTH_API_URL}/category`
    );
  }

  getCategoryById(id: number) {
    return this.http.get(
      `${USER_AUTH_API_URL}/category/${id}`
    );
  }

  updateCategory(id: number, name: string, description: string) {
    return this.http.put(
      `${USER_AUTH_API_URL}/category/${id}`,
      {
        name,
        description
      }/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(
      `${USER_AUTH_API_URL}/category/${id}`/* , { headers: { 'x-access-token': localStorage.getItem('token') } } */
    );
  }
  
}
