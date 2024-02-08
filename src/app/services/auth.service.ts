import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Observable, delay, map, filter, switchMap, of } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import IUser from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // Collection reference for users in Firestore
    private usersCollection: AngularFirestoreCollection<IUser>;

    // Observable indicating whether the user is authenticated
    public isAuthenticated$: Observable<boolean>;

    // Observable indicating whether the user is authenticated, with a delay of 1 second
    public isAuthenticatedWithDelay$: Observable<boolean>;

    // Flag to determine if redirection after logout is enabled
    private redirect: boolean = false;

    constructor(
        private auth: AngularFireAuth, // Firebase Authentication service
        private db: AngularFirestore, // Firestore database service
        private router: Router, // Angular Router service
        private route: ActivatedRoute // Angular ActivatedRoute service
    ) {
        // Initialize users collection reference
        this.usersCollection = this.db.collection('users');

        // Observable to track authentication state
        this.isAuthenticated$ = auth.user.pipe(map((isAuth) => !!isAuth));

        // Observable to track authentication state with a 1-second delay
        this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
            delay(1000)
        );

        // Subscription to router events to determine if redirection after logout is required
        this.router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd), // Filters to only consider NavigationEnd events
                map(() => this.route.firstChild), // Maps to the first child route
                switchMap((route) => route?.data ?? of({})) // Switches to the route data or an empty object
            )
            .subscribe((data: any) => {
                // Updates the redirect flag based on the 'authOnly' data property or sets it to false if not present
                this.redirect = data.authOnly ?? false;
            });
    }

    // Method to create a new user account
    public async createUser(userData: IUser): Promise<void> {
        if (!userData.password) {
            // Throws an error if password is not provided
            throw new Error('Password not provided!');
        }

        // Creates a new user account with provided email and password
        const userCredentials = await this.auth.createUserWithEmailAndPassword(
            userData.email,
            userData.password
        );

        if (!userCredentials.user) {
            // Throws an error if user creation fails
            throw new Error('User not found!');
        }

        // Adds user data to the Firestore collection
        await this.usersCollection.doc(userCredentials.user.uid).set({
            name: userData.name,
            email: userData.email,
            age: userData.age,
        });

        // Updates user profile display name
        await userCredentials.user.updateProfile({
            displayName: userData.name,
        });
    }

    // Method to log out the current user
    public async logout(e?: Event): Promise<void> {
        if (e) e.preventDefault();

        // Signs out the current user
        await this.auth.signOut();

        // Redirects to home page if redirection after logout is enabled
        if (this.redirect) {
            await this.router.navigateByUrl('/');
        }
    }
}
