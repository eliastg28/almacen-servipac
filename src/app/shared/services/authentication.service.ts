import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../interfaces/user.type';
import { Router } from '@angular/router';

const USER_AUTH_API_URL = 'https://nodejs-almacen.herokuapp.com/api/v1';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let listOfData;
    return (
      this.http
        .post<any>(`${USER_AUTH_API_URL}/auth/login`, { username, password })
        .pipe(
          map((user) => {
            for (const key in user) {
              if (Object.prototype.hasOwnProperty.call(user, key)) {
                const element = user[key];
                if (typeof element === 'object') {
                  listOfData = element;
                }
              }
            }
            console.log(listOfData);
            console.log(listOfData.status);
            if (listOfData && listOfData.token_access) {
              localStorage.setItem('currentUser', JSON.stringify(listOfData));
              localStorage.setItem('id', listOfData.id);
              localStorage.setItem('username', listOfData.username);
              localStorage.setItem('status', listOfData.status);
              localStorage.setItem('role', listOfData.role.description);
              this.currentUserSubject.next(listOfData);
            }
            return user;
          })
        )
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    localStorage.removeItem('status');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
    this.router.navigate(['/authentication/login-3']).then(() => true);
  }
}
