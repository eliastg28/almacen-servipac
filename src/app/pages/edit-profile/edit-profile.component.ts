import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  changePWForm: FormGroup;
  avatarUrl: string =
    'http://www.themenate.net/applicator/dist/assets/images/avatars/thumb-13.jpg';
  selectedCountry: any;
  selectedLanguage: any;

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private message: NzMessageService,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.changePWForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
    this.getData();
  }
  
  email = localStorage.getItem('email');
  status = localStorage.getItem('status');
  role = localStorage.getItem('role');
  username = localStorage.getItem('username');

  getData(): void {
    this.user.getUserById(localStorage.getItem('id'))
      .subscribe((data) => {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (typeof element === 'object') {
              let data = element;
              localStorage.setItem('email', data.email);
            }
          }
        }
      });
      console.log(typeof this.status);
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>Do you want to change your password?</i>',
      nzOnOk: () => this.message.success('Password Change Successfully'),
    });
  }

  submitForm(): void {
    for (const i in this.changePWForm.controls) {
      this.changePWForm.controls[i].markAsDirty();
      this.changePWForm.controls[i].updateValueAndValidity();
    }

    this.showConfirm();
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    this.getBase64(info.file.originFileObj, (img: string) => {
      this.avatarUrl = img;
    });
  }
}
