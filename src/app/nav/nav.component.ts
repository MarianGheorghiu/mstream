import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
    constructor(
        public modal: ModalService,
        public authService: AuthService,
        private auth: AngularFireAuth
    ) {}

    openLogin(e: Event): void {
        e.preventDefault();
        this.modal.toggleModal('auth');
    }

    async logout(e: Event): Promise<void> {
        e.preventDefault();
        await this.auth.signOut();
    }
}
