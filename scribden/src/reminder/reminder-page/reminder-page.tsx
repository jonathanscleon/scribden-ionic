import { Component, Prop, h } from '@stencil/core';
import { ItemService } from '../../item/item-service';

@Component({
  tag: 'reminder-page'
})
export class ReminderPage {
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
          <reminder-form
            itemId={item.id}
          ></reminder-form>)}
      </ion-content>
    ];
  }
}
