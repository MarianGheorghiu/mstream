import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * match function validates if two form controls have matching values.
 * @param controlName The name of the first control.
 * @param matchingControlName The name of the second control to match against.
 * @returns A ValidatorFn function that checks if the values of two controls match.
 */
export class RegisterValidators {
    static match(
        controlName: string,
        matchingControlName: string
    ): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            // Get the reference to the control and the matching control
            const control = group.get(controlName);
            const matchingControl = group.get(matchingControlName);

            // Check if controls exist in the form group
            if (!control || !matchingControl) {
                console.error(
                    'Form controls cannot be found in the form group.'
                );
                // Return an error indicating that controls were not found
                return { controlNotFound: false };
            }

            // Check if the values of both controls match
            const error =
                control.value === matchingControl.value
                    ? null // Values match, so no error
                    : { noMatch: true }; // Values do not match, return error

            // Set errors on the matching control based on the result
            matchingControl.setErrors(error);

            // Return the error object (null if values match, otherwise error object)
            return error;
        };
    }
}
