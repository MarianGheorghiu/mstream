import {
    AfterContentInit,
    Component,
    ContentChildren,
    QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
    selector: 'app-tabs-container',
    templateUrl: './tabs-container.component.html',
    styleUrls: ['./tabs-container.component.scss'],
})
export class TabsContainerComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs?: QueryList<TabComponent>;

    ngAfterContentInit(): void {
        const activeTabs = this.tabs?.filter((tab) => tab.isActive);

        if (!activeTabs || activeTabs.length === 0) {
            this.selectTab(this.tabs!.first);
        }
    }

    selectTab(tab: TabComponent): boolean {
        this.tabs?.forEach((t) => (t.isActive = false));
        tab.isActive = true;
        return false;
    }
}
