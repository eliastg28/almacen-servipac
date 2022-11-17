import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { RolComponent } from './rol/rol.component';
import { AuthenticationGuard } from '../shared/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'listar',
        component: ListarComponent,
        data: {
            title: 'Listar'
        },
        canActivate: [AuthenticationGuard]
  },
  {
    path: 'rol',
        component: RolComponent,
        data: {
            title: 'Rol'
        },
        canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
