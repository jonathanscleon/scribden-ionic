import { Component, Prop, h } from '@stencil/core';
import { ItemService } from '../item-service';

@Component({
  tag: 'item-detail-page'
})
export class ItemDetailPage {
  @Prop() itemId: string;

  componentDidLoad() {
    ItemService.fetchItem(this.itemId);
  }

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
            itemId={item.id}
          ></check-list>
        )}
        {item && (
          <note-editor
            itemId={item.id}
          ></note-editor>
        )}
        {item && (
          <reminder-form
            itemId={item.id}
          ></reminder-form>
        )}
        {item && (
          <tag-form
            itemId={item.id}
          ></tag-form>
        )}
      </ion-content>
    ];
  }
}
