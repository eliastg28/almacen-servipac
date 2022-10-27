import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Rol {
  id: number;
  descripcion: string;
}

const USER_AUTH_API_URL = 'http://almacen-servipac.herokuapp.com/roles';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  // private currentUserSubject: BehaviorSubject<Rol>;
  // public currentUser: Observable<Rol>;

  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<Rol>(
    //   JSON.parse(localStorage.getItem('currentUser'))
    // );
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // public get currentUserValue(): Rol {
  //   return this.currentUserSubject.value;
  // }

  // listRol(token:string){
  //   return this.http.post<any>(USER_AUTH_API_URL, { token })
  //   .pipe(map(rol => {
  //     if (rol && rol.token) {
  //       localStorage.setItem('currentUser', JSON.stringify(rol));
  //       this.currentUserSubject.next(rol);
  //     }
  //     return rol;
  //   }));
  // }

  // post con header token
  
  obtenerRespuesta(USER_AUTH_API_URL: string, token: string) {
    return this.http.post<any>(USER_AUTH_API_URL, { token });
  }
}
