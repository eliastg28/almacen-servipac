import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login3Component } from './login-3/login-3.component';
import { Error1Component } from './error-1/error-1.component';

const routes: Routes = [
    {
        path: 'login-3',
        component: Login3Component,
        data: {
            title: 'Login 3'
        }
    },
    {
        path: 'error-1',
        component: Error1Component,
        data: {
            title: 'Error 1'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
