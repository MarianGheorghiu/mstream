import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-clip',
    templateUrl: './clip.component.html',
    styleUrls: ['./clip.component.scss'],
})
export class ClipComponent implements OnInit {
    id: string = ''; // Initialize 'id' property

    // Constructor with ActivatedRoute injected
    constructor(public route: ActivatedRoute) {}

    // Lifecycle hook called after Angular has initialized all data-bound properties of a directive.
    ngOnInit(): void {
        // Subscribe to changes in route parameters
        this.route.params.subscribe((params: Params) => {
            // Update the 'id' property with the value of the 'id' route parameter
            this.id = params['id'];
        });
    }
}
