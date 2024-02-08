import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';

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
        },
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
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VideoRoutingModule {}
