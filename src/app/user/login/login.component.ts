import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    // auth props
    credentials = {
        email: '',
        password: '',
    };
    inSubmission = false;
    // alert props
    showAlert: boolean = false;
    alertMsg: string = '';
    alertColor: string = '';

    constructor(private auth: AngularFireAuth) {}

    async login(): Promise<void> {
        this.showAlert = true;
        this.setAlertMessage('Logging In...', 'blue');
        this.inSubmission = true;
        try {
            await this.auth.signInWithEmailAndPassword(
                this.credentials.email,
                this.credentials.password
            );
        } catch (error) {
            console.error(error);
            this.setAlertMessage('Something went wrong! Try again!', 'red');
            this.inSubmission = false;
            return;
        }

        this.setAlertMessage('Logged In!', 'green');
    }

    private setAlertMessage(message: string, color: string): void {
        this.alertMsg = message;
        this.alertColor = color;
    }
}
