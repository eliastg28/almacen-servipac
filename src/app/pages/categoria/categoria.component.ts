import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from '../../shared/services/category.service';

interface Category {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private data: CategoryService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getCategory();
  }

  mostrarInput = false;
  validateForm: FormGroup;
  listOfData: Category[] = [];
  editCache: { [key: string]: { edit: boolean; data: Category } } = {};


  errorNotification(): void {
    this.notification.error('Error', 'La categoría está en uso', {
      nzDuration: 4000,
    });
  }

  createErrorNotification(): void {
    this.notification.error('Error', 'La categoría ya existe', {
      nzDuration: 4000,
    });
  }

  successNotification(): void {
    this.notification.success('Eliminación', 'Categoría eliminada', {
      nzDuration: 4000,
    });
  }

  editErrorNotification(): void {
    this.notification.error('Error', 'La categoría no se puede editar', {
      nzDuration: 4000,
    });
  }

  createNotification(): void {
    this.notification.success('Creación', 'Nueva categoría creada', {
      nzDuration: 4000,
    });
  }

  editNotification(): void {
    this.notification.success('Edición', 'Categoría editada', {
      nzDuration: 4000,
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  getCategory(): void {    
    this.data.getAllCategories().subscribe(
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
        console.log(error);
      }
    )
  }

  deleteRow(id: number): void {
    this.data.deleteCategory(id).subscribe(
      (data) => {
        this.getCategory();
        this.successNotification();
      },
      (error) => {
        this.errorNotification();
        console.log(error);
      }
    );
  }

  addRow(): void {
    this.listOfData = [];
    this.data.createCategory(this.validateForm.value.name, this.validateForm.value.description).subscribe(
      (data) => {
        this.getCategory();
        this.createNotification();
      },
      (error) => {
        this.createErrorNotification();
      }
    );
    this.validateForm.reset();
    this.getCategory();
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
    this.data.updateCategory(id, this.editCache[id].data.name, this.editCache[id].data.description).subscribe(
      (data) => {
        this.getCategory();
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
