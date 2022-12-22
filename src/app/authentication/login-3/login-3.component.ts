import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  templateUrl: './login-3.component.html',
})
export class Login3Component {
  loginForm: FormGroup;

  // usuario: string;
  // contra: string;
  btnLogin: boolean = false;

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    this.btnLogin = true;
    this.loginForm.disable();

    this.authService
      .login(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value
      )
      .subscribe(
        (data) => {   
          // console.log(data);
          this.router.navigate(['/dashboard/home']);
        },
        (error) => {
          console.log(error);
          this.loginForm.reset();
          this.loginForm.enable();
          this.btnLogin = false;
          this.createBasicNotification();
        }
      );
  }

  createBasicNotification(): void {
    this.notification.error('Error', 'Usuario o contraseña incorrectos', {
      nzDuration: 4000,
    });
  }

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthenticationService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
