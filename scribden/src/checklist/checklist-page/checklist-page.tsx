import { Component, Prop, h } from '@stencil/core';
import { ItemService } from '../../item/item-service';

@Component({
  tag: 'checklist-page'
})
export class ChecklistPage {
  @Prop() itemId: string;

  componentDidLoad() {
    ItemService.fetchItem(this.itemId);
  }

  render() {
    const item = ItemService.getItem(this.itemId);
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>{item && item.name}</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content class="ion-padding">
        {item && (
          <check-list
            itemId={item.id}
          ></check-list>)}
      </ion-content>
    ];
  }
}
