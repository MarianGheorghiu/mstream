import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() modalID: string = '';

    constructor(public modal: ModalService, public portalModal: ElementRef) {}

    ngOnInit(): void {
        // creem un portal ca in React
        document.body.appendChild(this.portalModal.nativeElement);
    }

    closeModal(): void {
        this.modal.toggleModal(this.modalID);
    }

    ngOnDestroy(): void {
        document.body.removeChild(this.portalModal.nativeElement);
    }
}
