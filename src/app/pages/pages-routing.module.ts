import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './usuario/usuario.component';
import { RolComponent } from './rol/rol.component';
import { AuthenticationGuard } from '../shared/guards/authentication.guard';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { EstanteComponent } from './estante/estante.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProductoComponent } from './producto/producto.component';
import { TransaccionComponent } from './transaccion/transaccion.component';

const routes: Routes = [
  {
    path: 'usuario',
        component: ListarComponent,
        data: {
            title: 'usuario'
        },
        // canActivate: [AuthenticationGuard]
  },
  {
    path: 'rol',
        component: RolComponent,
        data: {
            title: 'Rol'
        },
        // canActivate: [AuthenticationGuard]
  },
  {
    path: 'categoria',
        component: CategoriaComponent,
        data: {
            title: 'Categoria'
        },
        // canActivate: [AuthenticationGuard]
  },
  {
    path: 'proveedor',
        component: ProveedorComponent,
        data: {
            title: 'Proveedor'
        },
        // canActivate: [AuthenticationGuard]
  },
  {
    path: 'almacen',
        component: AlmacenComponent,
        data: {
            title: 'Almacen'
        },
        // canActivate: [AuthenticationGuard]
  },
  {
    path: 'estante',
        component: EstanteComponent,
        data: {
            title: 'Estante'
        },
        // canActivate: [AuthenticationGuard]
  },
  {
    path: 'edit-profile',
        component: EditProfileComponent,
        data: {
            title: 'Editar Perfil'
        },
        // canActivate: [AuthenticationGuard]
  },
  {
    path: 'producto',
        component: ProductoComponent,
        data: {
            title: 'Producto'
        },
        // canActivate: [AuthenticationGuard]
  },
  {
    path: 'transaccion',
        component: TransaccionComponent,
        data: {
            title: 'Transaccion'
        },
        // canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
