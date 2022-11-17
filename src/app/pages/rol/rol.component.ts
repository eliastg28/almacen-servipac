import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../../shared/services/role.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';

interface Rol {
  id: number;
  row: number;
  description: string;
}

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})

export class RolComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private data: RoleService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      remember: [true]
    });
    
    this.getRoles();
  }

  mostrarInput = false;
  validateForm: FormGroup;
  
  getRoles(): void {
    this.data.getRol().subscribe(
      (data) => {
        let aux = Object.values(data);
        this.listOfData = aux[0];
        this.listOfData.map((item, index) => {
          item.row = index;
        });
        this.updateEditCache();
      },
      (error) => {
        console.log(error);
      }
      );

  }
  
  listOfData: Rol[] = [];

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
      },
      (error) => {
        console.log(error);
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
      },
      (error) => {
        console.log(error);
      }
      );

      // 
      // this.mostrarInput = false;
    



      // agregar nuevo rol
      // ...this.listOfData,
      // {
      //   id: this.listOfData.length + 1,
      //   row: this.listOfData.length + 1,
      //   description: this.validateForm.value.name
      // }
    // this.updateEditCache();
    this.validateForm.reset();
    this.getRoles();
  }

  startEdit(row: number): void {
    this.editCache[row].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
    // this.editCache[id].data.name = this.listOfData.find(item => item.id === id).name;
    this.editCache[id].data.description = this.listOfData.find(item => item.row === id).description;
  }
  
  saveEdit(row: number): void {
    this.data.editRol(row, this.editCache[row].data.description).subscribe(
      (data) => {
        // console.log(data);
        this.getRoles();
      },
      (error) => {
        console.log(error);
      }
    );


    // const index = this.listOfData.findIndex(item => item.row === row);
    // Object.assign(this.listOfData[index], this.editCache[row].data);
    // this.editCache[row].edit = false;
    // this.updateEditCache();
    // console.log(row);
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.row] = {
        edit: false,
        data: { ...item }
      };
    });
  }

}
