import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { RolComponent } from './rol/rol.component';

const routes: Routes = [
  {
    path: 'listar',
        component: ListarComponent,
        data: {
            title: 'Listar'
        }
  },
  {
    path: 'rol',
        component: RolComponent,
        data: {
            title: 'Rol'
        }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
