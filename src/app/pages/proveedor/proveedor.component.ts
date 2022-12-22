import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SupplierService } from '../../shared/services/supplier.service';

interface Supplier {
  id: number;
  ruc: string;
  company_name: string;
  address: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
})
export class ProveedorComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private data: SupplierService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      ruc: [null, [Validators.required]],
      company_name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
    });
    this.getSupplier();
  }

  mostrarInput = false;
  validateForm: FormGroup;
  listOfData: Supplier[] = [];
  editCache: { [key: string]: { edit: boolean; data: Supplier } } = {};

  errorNotification(): void {
    this.notification.error('Error', 'El proveedor está en uso', {
      nzDuration: 4000,
    });
  }

  createErrorNotification(): void {
    this.notification.error('Error', 'El proveedor ya existe', {
      nzDuration: 4000,
    });
  }

  successNotification(): void {
    this.notification.success('Eliminación', 'Proveedor eliminado', {
      nzDuration: 4000,
    });
  }

  editErrorNotification(): void {
    this.notification.error('Error', 'El proveedor no se puede editar', {
      nzDuration: 4000,
    });
  }

  createNotification(): void {
    this.notification.success('Creación', 'Nuevo proveedor creado', {
      nzDuration: 4000,
    });
  }

  editNotification(): void {
    this.notification.success('Edición', 'Proveedor editado', {
      nzDuration: 4000,
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  getSupplier(): void {
    this.data.getAllSuppliers().subscribe(
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
    this.data.deleteSupplier(id).subscribe(
      (data) => {
        this.getSupplier();
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
    let ruc = this.validateForm.value.ruc;
    let company_name = this.validateForm.value.company_name;
    let address = this.validateForm.value.address;
    let phone = this.validateForm.value.phone;
    let email = this.validateForm.value.email;

    this.data
      .createSupplier(ruc, company_name, address, phone, email)
      .subscribe(
        (data) => {
          this.getSupplier();
          this.createNotification();
        },
        (error) => {
          this.createErrorNotification();
        }
      );
    this.validateForm.reset();
    this.getSupplier();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
    this.editCache[id].data.ruc = this.listOfData.find(
      (item) => item.id === id
    ).ruc;
    this.editCache[id].data.company_name = this.listOfData.find(
      (item) => item.id === id
    ).company_name;
    this.editCache[id].data.address = this.listOfData.find(
      (item) => item.id === id
    ).address;
    this.editCache[id].data.phone = this.listOfData.find(
      (item) => item.id === id
    ).phone;
    this.editCache[id].data.email = this.listOfData.find(
      (item) => item.id === id
    ).email;
  }

  saveEdit(id: number): void {
    this.data
      .updateSupplier(
        id,
        this.editCache[id].data.ruc,
        this.editCache[id].data.company_name,
        this.editCache[id].data.address,
        this.editCache[id].data.phone,
        this.editCache[id].data.email
      )
      .subscribe(
        (data) => {
          this.getSupplier();
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
