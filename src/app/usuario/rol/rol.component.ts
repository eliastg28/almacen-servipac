import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { InterceptorService } from '../../shared/services/interceptor.service';

interface Rol {
  id: number;
  descripcion: string;
}

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})

export class RolComponent implements OnInit {
  
  mostrarInput = false;
  validateForm: FormGroup;
  
  listOfData: Rol[] = [
    {
      id: 1,
      descripcion: 'Administrador'
    },
    {
      id: 2,
      descripcion: 'Encargado de Almacén',
    }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      descripcion: [null, [Validators.required]],
      remember: [true]
    });
    this.updateEditCache();
  }


  token = localStorage.getItem('token');


  editCache: { [key: string]: { edit: boolean; data: Rol } } = {};

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
        id: this.listOfData.length + 1,
        descripcion: this.validateForm.value.descripcion
      }
    ];
    this.limpiarInputs();
    this.updateEditCache();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
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
