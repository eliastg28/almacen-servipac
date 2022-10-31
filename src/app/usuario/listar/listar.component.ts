import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';


interface ItemData {
  id: number;
  username: string;
  email: string;
  role: string;
  state: boolean;
}

@Component({
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})


export class ListarComponent implements OnInit {

  constructor(private fb: FormBuilder, private data: AuthenticationService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      role: [null, [Validators.required]],
      state: [null, [Validators.required]],
      remember: [true]      
    });
    this.updateEditCache();

  }

  mostrarInput = false;
  validateForm: FormGroup;
  
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};




  listOfData: ItemData[] = [
    {
      id: 1,
      username: 'eliastg',
      email: 'tg.elias.s@gmail.com',
      role: 'Encargado de almacén',
      state: true
    },
    {
      id: 2,
      username: 'pieromc',
      email: 'piero.mc@gmail.com',
      role: 'Administrador',
      state: true
    }
  ];

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
        username: this.validateForm.value.username,
        email: this.validateForm.value.email,
        role: this.validateForm.value.role,
        state: this.validateForm.value.state
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
