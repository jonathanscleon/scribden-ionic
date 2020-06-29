import { Component, State, h } from '@stencil/core';
import { ItemService } from '../../services/item';
import { ItemSyncService } from '../../services/itemSync';

@Component({
    tag: 'item-list-page',
    styleUrl: 'item-list.css'
})
export class ItemListPage {
    @State() filter: string = '';

    componentDidLoad() {
      // @TODO: check auth and redirect if not authenticated
      ItemSyncService.fetchAll();
    }

    filterList(evt) {
      this.filter = evt.target.value;
    }

    addItem(name: string) {
      ItemService.createItem(name);
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>Home</ion-title>
                    <ion-searchbar
                      onInput={evt => this.filterList(evt)}
                    ></ion-searchbar>
                </ion-toolbar>
            </ion-header>,
            <ion-content id="item-list">
                <quick-add
                  label='New Item'
                  add={(value: string) => this.addItem(value)}
                ></quick-add>
                <ion-list>
                    {ItemService.getAll().map((item) => (
                      (item.name.toLowerCase().indexOf(this.filter) > -1) &&
                      <item-list-item
                        item={item}
                      ></item-list-item>
                    ))}
                </ion-list>
            </ion-content>
        ];
    }
}
