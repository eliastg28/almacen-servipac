import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';

interface Rol {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})

export class RolComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private data: AuthenticationService) { }
  
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
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
        this.updateEditCache();
      },
      (error) => {
        console.log(error);
      }
      );
  }
  
  listOfData: Rol[] = [];



  token = localStorage.getItem('token');


  editCache: { [key: number]: { edit: boolean; data: Rol } } = {};

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  deleteRow(id: number): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: this.listOfData.length + 4,
        name: this.validateForm.value.name,
        description: this.validateForm.value.description
      }
    ];
    this.updateEditCache();
    this.limpiarInputs();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
    this.editCache[id].data.name = this.listOfData.find(item => item.id === id).name;
    this.editCache[id].data.description = this.listOfData.find(item => item.id === id).description;
  }
  
  saveEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    this.updateEditCache();
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  limpiarInputs(): void {
    this.validateForm.reset();
  }

}
