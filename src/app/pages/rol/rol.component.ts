import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../../shared/services/role.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface Rol {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
})
export class RolComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private data: RoleService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      remember: [true],
    });

    this.getRoles();
  }

  errorNotification(): void {
    this.notification.error('Error', 'El rol está en uso', {
      nzDuration: 4000,
    });
  }
  
  createErrorNotification(): void {
    this.notification.error('Error', 'El rol ya existe', {
      nzDuration: 4000,
    });
  }

  editErrorNotification(): void {
    this.notification.error('Error', 'El rol no se puede editar', {
      nzDuration: 4000,
    });
  }
  
  successNotification(): void {
    this.notification.success('Eliminación', 'Rol eliminado', {
      nzDuration: 4000,
    });
  }
  
  createNotification(): void {
    this.notification.success('Creación', 'Nuevo rol creado', {
      nzDuration: 4000,
    });
  }

  editNotification(): void {
    this.notification.success('Edición', 'Rol editado', {
      nzDuration: 4000,
    });
  }
  
  mostrarInput = false;
  validateForm: FormGroup;
  listOfData: Rol[] = [];
  editCache: { [key: number]: { edit: boolean; data: Rol } } = {};
  
  getRoles(): void {    
    this.data.getRol().subscribe(
      (data) => {
        
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (typeof element === 'object') {
            this.listOfData = element;
            }
          }
        }
        this.updateEditCache();
      },
      (error) => {
        // console.log(error);
      }
    )
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  deleteRow(id: number): void {
    this.data.deleteRol(id).subscribe(
      (data) => {
        this.getRoles();
        this.successNotification();
      },
      (error) => {
        this.errorNotification();
      }
    );
  }

  addRow(): void {
    this.listOfData = [];
    this.data.postRol(this.validateForm.value.name, this.validateForm.value.description).subscribe(
      (data) => {
        this.getRoles();
        this.createNotification();
      },
      (error) => {
        console.log(error);
        this.createErrorNotification();
      }
    );
    this.validateForm.reset();
    this.getRoles();
  }
  
  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
    this.editCache[id].data.name = this.listOfData.find(
      (item) => item.id === id
    ).name;
    this.editCache[id].data.description = this.listOfData.find(
      (item) => item.id === id
    ).description;
  }

  saveEdit(id: number): void {
    this.data.editRol(id, this.editCache[id].data.name, this.editCache[id].data.description).subscribe(
      (data) => {
        this.getRoles();
        this.editNotification();
      },
      (error) => {
        this.editErrorNotification();
        this.cancelEdit(id);
      }
    );
  }

  limpiarInput(): void {
    this.validateForm.reset();
  }
  
  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
}
