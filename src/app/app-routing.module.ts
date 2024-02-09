import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Define an array of route configurations
const routes: Routes = [
    {
        // Route for the home page
        path: '',
        // Component to render for the home page
        component: HomeComponent,
    },
    {
        // Route for the 'about' page
        path: 'about',
        // Component to render for the 'about' page
        component: AboutComponent,
    },
    {
        // Route for dynamic 'clip' pages with an 'id' parameter
        path: 'clip/:id',
        // Component to render for each 'clip' page
        component: ClipComponent,
    },
    {
        // Wildcard route for any other unknown paths
        path: '**',
        // Component to render for unknown paths (404 Not Found)
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
