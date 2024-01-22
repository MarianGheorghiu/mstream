import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    // alert props
    showAlert: boolean = false;
    alertMsg: string = '';
    alertColor: string = '';

    // form props
    name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    email = new FormControl('', [Validators.required, Validators.email]);
    age = new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.max(120),
    ]);
    password = new FormControl('', [
        Validators.required,
        Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
        ),
    ]);
    confirm_password = new FormControl('', [Validators.required]);

    // pentru a putea trimite prin input datele, trebuie separate
    registerForm = new FormGroup({
        name: this.name,
        email: this.email,
        age: this.age,
        passowrd: this.password,
        confirm_password: this.confirm_password,
    });

    register(): void {
        this.showAlert = true;
        this.alertMsg = 'Please wait! Account is beign crearted.';
        this.alertColor = 'blue';
    }
}
