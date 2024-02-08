import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    AbstractControl,
    AsyncValidator,
    ValidationErrors,
} from '@angular/forms';

/**
 * Constructs the EmailTaken service with AngularFireAuth dependency injection.
 * @param auth An instance of AngularFireAuth service.
 * Validates if the email entered by the user is already taken.
 * @param control The form control representing the email input.
 * @returns A Promise resolving to either a ValidationErrors object if the email is taken, or null if it's available.
 */
@Injectable({
    providedIn: 'root',
})
export class EmailTaken implements AsyncValidator {
    constructor(private auth: AngularFireAuth) {}

    validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
        // Use AngularFireAuth service to check if the email is already registered
        return this.auth
            .fetchSignInMethodsForEmail(control.value)
            .then((response) =>
                response.length ? { emailTaken: true } : null
            );
    };
}
