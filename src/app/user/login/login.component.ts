import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    credentials = {
        email: '',
        password: '',
    };

    login(): void {
        console.log('logged');
        console.log(this.credentials);
    }
}
