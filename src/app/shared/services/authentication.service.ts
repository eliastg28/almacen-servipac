import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../interfaces/user.type';
import { Router } from '@angular/router';

const USER_AUTH_API_URL = 'https://almacen-servipac.herokuapp.com';


@Injectable()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${USER_AUTH_API_URL}/login`, { username, password })
        .pipe(map(user => {
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('username', user.name);
                localStorage.setItem('role', user.role);
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        this.currentUserSubject.next(null);
        this.router.navigate(['/authentication/login-3']).then(() => true);
    }
}