import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
    constructor(public modal: ModalService) {}

    openLogin(e: Event): void {
        e.preventDefault();
        this.modal.toggleModal('auth');
    }
}
