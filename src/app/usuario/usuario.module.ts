import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { ListarComponent } from './listar/listar.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
// ngzorro styles button
import { NzButtonModule } from 'ng-zorro-antd/button';
// formsmodule
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    NzTableModule,
    NzPopconfirmModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzButtonModule,
    FormsModule
  ]
})
export class UsuarioModule { }
