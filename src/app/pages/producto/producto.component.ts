import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from '../../shared/services/product.service';
import { SupplierService } from '../../shared/services/supplier.service';
import { CategoryService } from '../../shared/services/category.service';
import { WarehouseService } from '../../shared/services/warehouse.service';
import { RackService } from '../../shared/services/rack.service';

interface Product {
  id: number;
  name: string;
  supplier: {
    id: number;
    company_name: string;
  }
  category: {
    id: number;
    name: string;
  };
  warehouse: {
    id: number;
    name: string;
  };
  stock: number;
  rack: {
    id: number;
    name: string;
  }
  level: number;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private data: ProductService,
    private supplier: SupplierService,
    private category: CategoryService,
    private rack: RackService,
    private warehouse: WarehouseService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      supplier: [null, [Validators.required]],
      category: [null, [Validators.required]],
      warehouse: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      rack: [null, [Validators.required]],
      level: [null, [Validators.required]],
    });
    this.getCategory();
    this.getSupplier();
    this.getWarehouse();
    this.getRack();
    this.getProduct();
  }

  mostrarInput = false;
  validateForm: FormGroup;
  listOfData: Product[] = [];
  listOfSupplier: any[] = [];
  listOfCategory: any[] = [];
  listOfWarehouse: any[] = [];
  listOfRack: any[] = [];
  listOfLevel: any[] = [];
  editCache: { [key: string]: { edit: boolean; data: Product } } = {};

  getRackAndLevel(id: number): void {
    this.data.getRackAndLevel(id).subscribe((res: any) => {
      this.listOfRack = res.data;
      console.log(this.listOfRack);
    });
  }

  compareLevel(id:number):void{

  }

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

  getSupplier(): void {
    this.supplier.getAllSuppliers().subscribe(
      (data) => {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (typeof element === 'object') {
              this.listOfSupplier = element;
            }
          }
        }
        this.listOfSupplier.sort((a, b) => a.id - b.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCategory(): void {
    this.category.getAllCategories().subscribe(
      (data) => {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (typeof element === 'object') {
              this.listOfCategory = element;
            }
          }
        }
        this.listOfCategory.sort((a, b) => a.id - b.id);
      },
      (error) => {
        console.log(error);
      }
    );
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

  getRack(): void{
    this.rack.getAllRack().subscribe(
      (data) => {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (typeof element === 'object') {
              this.listOfRack = element;
            }
          }
        }
        this.listOfRack.sort((a, b) => a.id - b.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProduct(): void {
    this.data.getAllProduct().subscribe(
      (data) => {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (typeof element === 'object') {
              this.listOfData = element;
            }
          }
        }
        this.listOfData.sort((a, b) => a.id - b.id);
        this.updateEditCache();
        console.log(this.listOfData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteRow(id: number): void {
    this.data.deleteProduct(id).subscribe(
      (data) => {
        this.getProduct();
        this.successNotification();
      },
      (error) => {
        this.errorNotification();
        this.updateEditCache();
      }
    );
  }

  addRow(): void {
    this.listOfData = [];

    this.data
      .createProduct(
        this.validateForm.value.name,
        this.validateForm.value.supplier,
        this.validateForm.value.category,
        this.validateForm.value.warehouse,
        this.validateForm.value.stock,
        this.validateForm.value.rack,
        this.validateForm.value.level
      )
      .subscribe(
        (data) => {
          this.getProduct();
          this.createNotification();
          console.log(this.validateForm.value.name,
            this.validateForm.value.supplier,
            this.validateForm.value.category,
            this.validateForm.value.warehouse,
            this.validateForm.value.stock,
            this.validateForm.value.rack,
            this.validateForm.value.level);
        },
        (error) => {
          this.createErrorNotification();
        }
      );
    this.validateForm.reset();
    this.getProduct();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
    this.listOfLevel = Array.from({length: this.editCache[id].data.level}, (v, k) => k + 1);
  }

  cancelEdit(id: number): void {
    this.editCache[id].edit = false;
    this.editCache[id].data.name = this.listOfData.find(
      (item) => item.id === id
    ).name;
    this.editCache[id].data.supplier = this.listOfData.find(
      (item) => item.id === id
    ).supplier;
    this.editCache[id].data.category = this.listOfData.find(
      (item) => item.id === id
    ).category;
    this.editCache[id].data.warehouse = this.listOfData.find(
      (item) => item.id === id
    ).warehouse;
    this.editCache[id].data.stock = this.listOfData.find(
      (item) => item.id === id
    ).stock;
    this.editCache[id].data.rack = this.listOfData.find(
      (item) => item.id === id
    ).rack;
    this.editCache[id].data.level = this.listOfData.find(
      (item) => item.id === id
    ).level;
  }

  saveEdit(id: number): void {
    this.data
      .updateProduct(
        id,
        this.editCache[id].data.name,
        this.editCache[id].data.supplier.id,
        this.editCache[id].data.category.id,
        this.editCache[id].data.warehouse.id,
        this.editCache[id].data.stock,
        this.editCache[id].data.rack.id,
        this.editCache[id].data.level
      )
      .subscribe(
        (data) => {
          this.getProduct();
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
