import { Routes } from '@angular/router';
import { AuthenticationGuard } from '../guards/authentication.guard';

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'dashboard',
        canActivate: [AuthenticationGuard],
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'usuario',
        data: {
            title: 'Usuario'
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard/home',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../pages/pages.module').then(m => m.UsuarioModule),
            }
        ],
    }
];