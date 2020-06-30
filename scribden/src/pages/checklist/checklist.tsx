import { Component, Prop, h } from '@stencil/core';
import { ItemService } from '../../services/item';

@Component({
    tag: 'checklist-page'
})
export class ChecklistPage {
    @Prop() itemId: string;

    render() {
        const item = ItemService.getItem(this.itemId);
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>{item && item.name}</ion-title>
                </ion-toolbar>
            </ion-header>,
            <ion-content class="ion-padding">
                {item && (
                <check-list
                    item={item}
                ></check-list>)}
            </ion-content>
        ];
    }
}
