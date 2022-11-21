import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../../shared/services/role.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface Rol {
  id: number;
  name: string;
  state: boolean;
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

  // declarar listOfData como arreglo de objetos
  // listOfData: any[] = [];

  mostrarInput = false;
  validateForm: FormGroup;

  // listOfData tipo objeto
  listOfData: Rol[] = [];

  // getRoles(){
  //   this.data.getRol().subscribe(
  //     (data) => {
  //       console.log(typeof data);
  //       // this.listOfData = data;
  //       this.updateEditCache();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  getRoles(): void {
    this.data.getRol().subscribe(
      (data) => {
        // console.log(typeof data);
        // console.log(data);

        this.listOfData = data
          .toString()
          .split(',')
          .map((item, index) => {
            return {
              id: data[index].id,
              name: data[index].name,
              state: true,
              row: index + 1
            };
          });
        // ordenar por id
        this.listOfData.sort((a, b) => a.id - b.id);
        this.updateEditCache();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // this.listOfData = data[0];
  // this.listOfData.map((item, index) => {
  //   item.row = index;
  // });

  editCache: { [key: number]: { edit: boolean; data: Rol } } = {};

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  deleteRow(id: number): void {
    this.data.deleteRol(id).subscribe(
      (data) => {
        // console.log(data);
        this.getRoles();
        this.successNotification();
      },
      (error) => {
        this.errorNotification();
      }
    );
    // this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  addRow(): void {
    this.listOfData = [];
    // insert data with service postRol(name)
    this.data.postRol(this.validateForm.value.name).subscribe(
      (data) => {
        // console.log(data);
        this.getRoles();
        this.createNotification();
      },
      (error) => {
        this.createErrorNotification();
      }
    );

    //
    // this.mostrarInput = false;

    // agregar nuevo rol
    // ...this.listOfData,
    // {
    //   id: this.listOfData.length + 1,
    //   row: this.listOfData.length + 1,
    //   name: this.validateForm.value.name
    // }
    // this.updateEditCache();
    this.validateForm.reset();
    this.getRoles();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
    // this.editCache[id].data.name = this.listOfData.find(item => item.id === id).name;
    this.editCache[id].data.name = this.listOfData.find(
      (item) => item.id === id
      // limpia el input
      // this.validateForm.reset()
    ).name;

  }

  saveEdit(id: number): void {
    this.data.editRol(id, this.editCache[id].data.name).subscribe(
      (data) => {
        this.getRoles();
      },
      (error) => {
        this.createErrorNotification();
        this.cancelEdit(id);
      }
    );

    // const index = this.listOfData.findIndex(item => item.row === row);
    // Object.assign(this.listOfData[index], this.editCache[row].data);
    // this.editCache[row].edit = false;
    // this.updateEditCache();
    // console.log(row);
  }

  limpiarInput(): void {
    this.validateForm.reset();
  }

  // toUpper(event: any): void {
  //   this.validateForm.controls.name.setValue(event.target.value.toUpperCase());
  // }

  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
}
