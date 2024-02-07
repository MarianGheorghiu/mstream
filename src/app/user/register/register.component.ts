import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    // auth props
    inSubmission = false;
    // alert props
    showAlert: boolean = false;
    alertMsg: string = '';
    alertColor: string = '';

    constructor(private authService: AuthService) {}

    // form props
    name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    email = new FormControl('', [Validators.required, Validators.email]);
    age = new FormControl<number | null>(null, [
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
        password: this.password,
        confirm_password: this.confirm_password,
    });

    async register(): Promise<void> {
        this.showAlert = true;
        this.setAlertMessage('Please wait! Account is being created.', 'blue');
        this.inSubmission = true;

        try {
            await this.authService.createUser(this.registerForm.value as IUser);
        } catch (error) {
            console.error(error);
            this.setAlertMessage('Something went wrong! Try later!', 'red');
            this.inSubmission = false;
            return;
        }

        this.setAlertMessage('Account created!', 'green');
    }

    private setAlertMessage(message: string, color: string): void {
        this.alertMsg = message;
        this.alertColor = color;
    }
}
