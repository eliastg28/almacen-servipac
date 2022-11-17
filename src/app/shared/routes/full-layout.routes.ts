import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CheckLoginGuard } from '../guards/check-login.guard';

export const FullLayout_ROUTES: Routes = [
    {
        path: 'authentication',
        canActivate: [CheckLoginGuard],
        loadChildren: () => import('../../authentication/authentication.module').then(m => m.AuthenticationModule)
    },  
];