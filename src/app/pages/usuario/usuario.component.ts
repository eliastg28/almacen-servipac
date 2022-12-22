import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RoleService } from '../../shared/services/role.service';


interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  status: {
    name: string;
    state: boolean;
  };
  role: {
    id: number;
    description: string;
  };
}

@Component({
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class ListarComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private data: UserService,
    private notification: NzNotificationService,
    private role: RoleService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      status: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
    this.getUsers();
    this.getRoles();
  }


  errorNotification(): void {
    this.notification.error('Error', 'El Usuario está en uso', {
      nzDuration: 4000,
    });
  }

  createErrorNotification(): void {
    this.notification.error('Error', 'El usuario ya existe', {
      nzDuration: 4000,
    });
  }

  successNotification(): void {
    this.notification.success('Eliminación', 'Usuario eliminado', {
      nzDuration: 4000,
    });
  }

  createNotification(): void {
    this.notification.success('Creación', 'Nuevo usuario creado', {
      nzDuration: 4000,
    });
  }

  editNotification(): void {
    this.notification.success('Edición', 'Usuario editado', {
      nzDuration: 4000,
    });
  }
  
  editErrorNotification(): void {
    this.notification.error('Error', 'Error al editar', {
      nzDuration: 4000,
    });
  }

  mostrarInput = false;
  validateForm: FormGroup;
  listOfData: User[] = [];
  listOfRoles: any[] = [];
  listOfStatus: any[] = [
    {
      name: 'ACTIVO',
      state: true
    },
    {
      name: 'INACTIVO',
      state: false
    }
  ]
  editCache: { [key: string]: { edit: boolean; data: User } } = {};

  disableButton(isDisableButton:boolean): void {
    isDisableButton= !isDisableButton;
  }

  getRoles(): void {
    this.role.getRol().subscribe(
      (data) => {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (typeof element === 'object') {
              this.listOfRoles = element;
            }
          }
        }
        this.listOfRoles.sort((a, b) => a.id - b.id);
        console.log(this.listOfRoles);
      },
      (error) => {
        console.log(error);
      }
    );
    // console.log(this.editCache[]);
  }

  getUsers(): void {
    this.data.getUser().subscribe(
      (data) => {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (typeof element === 'object') {
              this.listOfData = element;
            }
          }
        }
        this.listOfData.sort((a, b) => a.id - b.id);
        this.updateEditCache();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  deleteRow(id: number): void {
    this.data.deleteUser(id).subscribe(
      (data) => {
        this.getUsers();
        this.successNotification();
      },
      (error) => {
        console.log(error);
        this.errorNotification();
      }
    );
  }

  addRow(): void {
    this.listOfData = [];
    const username = this.validateForm.value.username;
    const password = this.validateForm.value.password;
    const email = this.validateForm.value.email;
    const status = this.validateForm.value.status;
    const role = this.validateForm.value.role;

    this.data.createUser(username, password, email, status, role).subscribe(
      (data) => {
        this.getUsers();
        this.createNotification();
      },
      (error) => {
        this.createErrorNotification();
      }
    );

    this.validateForm.reset();
    this.getUsers();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
    this.editCache[id].data.username = this.listOfData.find(
      (item) => item.id === id
    ).username;
    this.editCache[id].data.email = this.listOfData.find(
      (item) => item.id === id
    ).email;
    this.editCache[id].data.status = this.listOfData.find(
      (item) => item.id === id
    ).status;
    this.editCache[id].data.role = this.listOfData.find(
      (item) => item.id === id
    ).role;

  }

  saveEdit(id: number): void {
    
    this.data
      .editUser(
        id,
        this.editCache[id].data.username,
        this.editCache[id].data.email,
        this.editCache[id].data.status.state,
        this.editCache[id].data.role.id
      )
      .subscribe(
        (data) => {
          this.getUsers();
          this.editNotification();
        },
        (error) => {
          this.editErrorNotification();
          this.cancelEdit(id);
        }
      );
  }

  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  limpiarInput(): void {
    this.validateForm.reset();
  }
}
