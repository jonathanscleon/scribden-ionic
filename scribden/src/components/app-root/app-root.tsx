import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="item-list-page" />
          <ion-route url="/detail/:itemId" component="item-detail-page" />
          <ion-route url="/checklist/:itemId" component="checklist-page" />
          <ion-route url="/note/:itemId" component="note-page" />
          <ion-route url="/reminder/:itemId" component="reminder-page" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
