import { Component, Prop, h, State } from '@stencil/core';
import { ItemService } from '../../services/item';

@Component({
    tag: 'checklist-page'
})
export class ChecklistPage {
    @Prop() itemId: string;
    @State() id: number;

    componentDidLoad() {
        this.id = parseInt(this.itemId);
    }

    render() {
        const item = ItemService.getItem(this.id);
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
