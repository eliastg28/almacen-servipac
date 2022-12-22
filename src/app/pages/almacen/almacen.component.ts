import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { WarehouseService } from '../../shared/services/warehouse.service';

interface Warehouse {
  id: number;
  name: string;
}

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private data: WarehouseService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.getWarehouse();
  }

  mostrarInput = false;
  validateForm: FormGroup;
  listOfData: Warehouse[] = [];
  editCache: { [key: string]: { edit: boolean; data: Warehouse } } = {};

  errorNotification(): void {
    this.notification.error('Error', 'El almacén está en uso', {
      nzDuration: 4000,
    });
  }

  createErrorNotification(): void {
    this.notification.error('Error', 'El almacén ya existe', {
      nzDuration: 4000,
    });
  }

  successNotification(): void {
    this.notification.success('Eliminación', 'Almacén eliminado', {
      nzDuration: 4000,
    });
  }

  editErrorNotification(): void {
    this.notification.error('Error', 'El almacén no se puede editar', {
      nzDuration: 4000,
    });
  }

  createNotification(): void {
    this.notification.success('Creación', 'Nuevo almacén creado', {
      nzDuration: 4000,
    });
  }

  editNotification(): void {
    this.notification.success('Edición', 'Almacén editado', {
      nzDuration: 4000,
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  getWarehouse(): void {
    this.data.getAllWarehouses().subscribe(
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
    );
  }

  deleteRow(id: number): void {
    this.data.deleteWarehouse(id).subscribe(
      (data) => {
        this.getWarehouse();
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
    let name = this.validateForm.value.name;

    this.data
      .createWarehouse(name)
      .subscribe(
        (data) => {
          this.getWarehouse();
          this.createNotification();
        },
        (error) => {
          this.createErrorNotification();
        }
      );
    this.validateForm.reset();
    this.getWarehouse();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
    this.editCache[id].data.name = this.listOfData.find(
      (item) => item.id === id
    ).name;
  }

  saveEdit(id: number): void {
    this.data
      .updateWarehouse(
        id,
        this.editCache[id].data.name
      )
      .subscribe(
        (data) => {
          this.getWarehouse();
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
