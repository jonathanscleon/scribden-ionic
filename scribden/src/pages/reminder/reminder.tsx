import { Component, Prop, h } from '@stencil/core';
import { ItemService } from '../../services/item';

@Component({
  tag: 'reminder-page'
})
export class ReminderPage {
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
          <reminder-form
            itemId={item.id}
          ></reminder-form>)}
      </ion-content>
    ];
  }
}
