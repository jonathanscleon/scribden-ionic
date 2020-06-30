import { Component, Prop, h, State } from '@stencil/core';
import { ItemService } from '../../services/item';

@Component({
    tag: 'item-detail-page'
})
export class ItemDetailPage {
    @Prop() itemId: string;
    @State() id: number;

    componentDidLoad() {
        this.id = parseInt(this.itemId);
        ItemService.fetchItem(this.id);
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
                    ></check-list>
                )}
                {item && (
                    <note-editor
                        item={item}
                    ></note-editor>
                )}
                {item && (
                    <reminder-form
                        item={item}
                    ></reminder-form>
                )}
                {item && (
                    <tag-form
                        item={item}
                    ></tag-form>
                )}
            </ion-content>
        ];
    }
}
