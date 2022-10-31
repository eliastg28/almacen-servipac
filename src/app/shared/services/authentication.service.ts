import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../interfaces/user.type';
// import { InterceptorService } from './interceptor.service';

const USER_AUTH_API_URL = 'http://almacen-servipac.herokuapp.com';

@Injectable()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient/* , private interceptor: InterceptorService */) {
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
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }

    
    getRol() {
        return this.http.get(`${USER_AUTH_API_URL}/roles`, { headers: { Authorization: localStorage.getItem('token') } });
    }

    

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}