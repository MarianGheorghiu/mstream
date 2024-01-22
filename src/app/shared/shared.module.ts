import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabComponent } from './tab/tab.component';
import { InputComponent } from './input/input.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
    declarations: [
        ModalComponent,
        TabsContainerComponent,
        TabComponent,
        InputComponent,
        AlertComponent,
    ],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [
        ModalComponent,
        TabComponent,
        TabsContainerComponent,
        InputComponent,
        AlertComponent,
    ],
})
export class SharedModule {}
