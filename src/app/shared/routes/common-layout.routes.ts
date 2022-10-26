import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'dashboard',
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
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../usuario/usuario.module').then(m => m.UsuarioModule),
            },
            {
                // not matched
                path: '**',
                redirectTo: '/authentication/error-1',
            }
        ]
    }
];