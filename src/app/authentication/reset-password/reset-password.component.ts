import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {

  loginForm: FormGroup;
  email: string;

  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      remember: [true]
    });
  }
  
  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }
}
