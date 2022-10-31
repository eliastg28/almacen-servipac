import { Component} from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';


@Component({
    templateUrl: './login-3.component.html'
})

export class Login3Component{

    loginForm: FormGroup;

    usuario: string;
    contra: string;
    

    submitForm(): void {
        for (const i in this.loginForm.controls) {
            this.loginForm.controls[ i ].markAsDirty();
            this.loginForm.controls[ i ].updateValueAndValidity();
        }
        const usuario = this.loginForm.controls.userName.value;
        const contra = this.loginForm.controls.password.value;

        this.authService.login(usuario, contra).subscribe(
            data => {
                // console.log(data);
                this.router.navigate(['/dashboard']);

                localStorage.setItem('username', data.username);
                localStorage.setItem('role', data.role);
                localStorage.setItem('token', data.token);
            },
            error => {
                // console.log(error);
                this.usuario = '';
                this.contra = '';
                this.router.navigate(['/authentication/login-3']);
                alert('usuario o contraseña incorrectos');
            }
        );

       
        // use authService subscribe to login
        // this.authService.login(this.usuario, this.contra).subscribe(
        //     (data) => {
        //         console.log(data);
        //         // this.router.navigate(['/dashboard']);
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // );

        // console.log(this.loginForm.controls.userName.value);
        // console.log(this.loginForm.controls.password.value);



        // console.log(this.loginForm.controls.userName.value);
        // console.log(this.loginForm.controls.password.value);
        // let user = this.loginForm.controls.userName.value;
        // let password = this.loginForm.controls.password.value;
        // if (this.usuario === "elias" && this.contra === "elias") {
        //     this.login = true;
        //     this.router.navigate(['/dashboard']);
        // }
        // else if (this.usuario.length <= 0 || this.contra.length<=0) {
        //     // alert("Todos los campos son obligatorios");
        // }
        // else{
        //     this.login = false;
        //     alert("Usuario o contraseña incorrectos");
        // }
    }

    constructor(private fb: FormBuilder, public router: Router, private authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            userName: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ]
        });
    }
}    