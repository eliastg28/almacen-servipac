import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RackService } from '../../shared/services/rack.service';
import { WarehouseService } from '../../shared/services/warehouse.service';

interface Rack {
  id: number;
  name: string;
  levels: number;
  warehouse: {
    id: number;
    name: string;
  };
}

@Component({
  selector: 'app-estante',
  templateUrl: './estante.component.html',
  styleUrls: ['./estante.component.css'],
})
export class EstanteComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private data: RackService,
    private warehouse: WarehouseService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      levels: [null, [Validators.required]],
      warehouse_id: [null, [Validators.required]],
    });
    this.getRack();
    this.getWarehouse();
  }

  mostrarInput = false;
  validateForm: FormGroup;
  listOfLevels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  listOfData: Rack[] = [];
  listOfWarehouse: any[] = [];
  editCache: { [key: string]: { edit: boolean; data: Rack } } = {};

  errorNotification(): void {
    this.notification.error('Error', 'El estante está en uso', {
      nzDuration: 4000,
    });
  }

  createErrorNotification(): void {
    this.notification.error('Error', 'El estante ya existe', {
      nzDuration: 4000,
    });
  }

  successNotification(): void {
    this.notification.success('Eliminación', 'Estante eliminado', {
      nzDuration: 4000,
    });
  }

  editErrorNotification(): void {
    this.notification.error('Error', 'El estante no se puede editar', {
      nzDuration: 4000,
    });
  }

  createNotification(): void {
    this.notification.success('Creación', 'Nuevo estante creado', {
      nzDuration: 4000,
    });
  }

  editNotification(): void {
    this.notification.success('Edición', 'Estante editado', {
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
    this.warehouse.getAllWarehouses().subscribe(
      (data) => {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (typeof element === 'object') {
              this.listOfWarehouse = element;
            }
          }
        }
        this.listOfWarehouse.sort((a, b) => a.id - b.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRack(): void {
    this.data.getAllRack().subscribe(
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
    this.data.deleteRack(id).subscribe(
      (data) => {
        this.getRack();
        this.successNotification();
      },
      (error) => {
        this.errorNotification();
      }
    );
  }

  addRow(): void {
    this.listOfData = [];

    this.data
      .createRack(this.validateForm.value.name, this.validateForm.value.levels, this.validateForm.value.warehouse_id)
      .subscribe(
        (data) => {
          this.getRack();
          this.createNotification();
        },
        (error) => {
          this.createErrorNotification();
        }
      );
    this.validateForm.reset();
    this.getRack();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
    this.editCache[id].data.name = this.listOfData.find(
      (item) => item.id === id
    ).name;
    this.editCache[id].data.levels = this.listOfData.find(
      (item) => item.id === id
    ).levels;
    this.editCache[id].data.warehouse = this.listOfData.find(
      (item) => item.id === id
    ).warehouse;
  }

  saveEdit(id: number): void {
    this.data
      .updateRack(
        id,
        this.editCache[id].data.name,
        this.editCache[id].data.levels,
        this.editCache[id].data.warehouse.id
      )
      .subscribe(
        (data) => {
          this.getRack();
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
