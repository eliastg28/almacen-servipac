import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RoleService } from '../../shared/services/role.service';

interface User {
  id: number;
  username: string;
  email: string;
  // password: string;
  role: number;
}

@Component({
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private data: UserService,
    private notification: NzNotificationService,
    private role: RoleService
  ) {}

  // "username": "user01",
  //   "email": "user01@email.com",
  //   "password": "abcd1234#",
  //   "role": 2

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
    console.log(this.getRoles());
    this.getUsers();
  }

  listOfRoles: any[] = [];

  getRoles(): void {
    this.role.getRol().subscribe(
      (data) => {
        this.listOfRoles = data
          .toString()
          .split(',')
          .map((item, index) => {
            return {
              id: data[index].id,
              name: data[index].name,
              state: data[index].state,
            };
          });
        this.listOfRoles.sort((a, b) => a.id - b.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  errorNotification(): void {
    this.notification.error('Error', 'El rol está en uso', {
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

  mostrarInput = false;
  validateForm: FormGroup;

  editCache: { [key: string]: { edit: boolean; data: User } } = {};

  listOfData: User[] = [];

  getUsers(): void {
    this.data.getUser().subscribe(
      (data) => {
        this.listOfData = data
          .toString()
          .split(',')
          .map((item, index) => {
            return {
              id: data[index].id,
              username: data[index].username,
              email: data[index].email,
              // password: data[index].password,
              role: data[index].role,
              row: index + 1,
            };
          });
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
    console.log(this.validateForm.value);
  }

  deleteRow(id: number): void {
    this.data.deleteUser(id).subscribe(
      (data) => {
        this.getUsers();
        console.log('usuario eliminado');
        // this.successNotification();
      },
      (error) => {
        console.log(error);
        // this.errorNotification();
      }
    );
    // this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  addRow(): void {
    this.listOfData = [];
    // insert data with service postRol(name)
    const username = this.validateForm.value.username;
    const email = this.validateForm.value.email;
    const password = this.validateForm.value.password;
    const role = this.validateForm.value.role;

    this.data.postUser(username, email, password, role).subscribe(
      (data) => {
        this.getUsers();
        console.log('Usuario creado');
        // this.createNotification();
      },
      (error) => {
        console.log(error);
        // this.createErrorNotification();
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
        this.editCache[id].data.role
      )
      .subscribe(
        (data) => {
          this.getUsers();
        },
        (error) => {
          console.log(error);
          // this.createErrorNotification();
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
