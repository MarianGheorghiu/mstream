import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
})
// Define the ManageComponent class
export class ManageComponent implements OnInit {
    // Initialize the default value for sorting videos
    videoOrder = '1';

    // Constructor with Router and ActivatedRoute injected
    constructor(private router: Router, private route: ActivatedRoute) {}

    // Lifecycle hook called after Angular has initialized all data-bound properties of a directive.
    ngOnInit(): void {
        // Subscribe to changes in query parameters
        this.route.queryParamMap.subscribe((params: Params) => {
            // Update the videoOrder based on the 'sort' query parameter, defaulting to '1'
            this.videoOrder = params['sort'] === '2' ? params['sort'] : '1';
        });
    }

    // Method to handle sorting of videos
    sortVideos(e: Event): void {
        // Extract the selected value from the event target
        const { value } = e.target as HTMLSelectElement;

        // Navigate to the current route with updated query parameters for sorting
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                sort: value, // Update the 'sort' query parameter with the selected value
            },
        });
    }
}
