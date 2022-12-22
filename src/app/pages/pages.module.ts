import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './pages-routing.module';
import { ListarComponent } from './usuario/usuario.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { RolComponent } from './rol/rol.component';
// import { authInterceptopProviders } from '../shared/services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { EstanteComponent } from './estante/estante.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProductoComponent } from './producto/producto.component';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { TransaccionComponent } from './transaccion/transaccion.component';

const antModule = [
  NzCardModule,
  NzAvatarModule,
  NzUploadModule,
  NzDividerModule,
  NzTableModule,
  NzPopconfirmModule,
  NzIconModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzButtonModule,
  NzSkeletonModule,
  NzModalModule,
  NzMessageModule,
  NzSliderModule,
  NzCheckboxModule
];

@NgModule({
  declarations: [
    ListarComponent,
    RolComponent,
    CategoriaComponent,
    ProveedorComponent,
    AlmacenComponent,
    EstanteComponent,
    EditProfileComponent,
    ProductoComponent,
    TransaccionComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ...antModule,
  ],
})
export class UsuarioModule {}
