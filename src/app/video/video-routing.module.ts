// Import necessary modules and components from Angular and AngularFire
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import {
    AngularFireAuthGuard,
    redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

// Define a function to redirect unauthorized users to the home page
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/');

// Define an array of route configurations
const routes: Routes = [
    {
        // Route for the 'manage' path
        path: 'manage',
        // Component to render for this route
        component: ManageComponent,
        // Additional data associated with this route
        data: {
            // Indicates that authentication is required to access this route
            authOnly: true,
            // Function to redirect unauthorized users to the home page
            authGuardPipe: redirectUnauthorizedToHome,
        },
        // Specify canActivate guards, in this case, AngularFireAuthGuard
        canActivate: [AngularFireAuthGuard],
    },
    {
        // Route for the 'upload' path
        path: 'upload',
        // Component to render for this route
        component: UploadComponent,
        // Additional data associated with this route
        data: {
            // Indicates that authentication is required to access this route
            authOnly: true,
            // Function to redirect unauthorized users to the home page
            authGuardPipe: redirectUnauthorizedToHome,
        },
        // Specify canActivate guards, in this case, AngularFireAuthGuard
        canActivate: [AngularFireAuthGuard],
    },
    {
        // Redirect route from 'manage-clips' to 'manage'
        path: 'manage-clips',
        redirectTo: 'manage',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VideoRoutingModule {}
