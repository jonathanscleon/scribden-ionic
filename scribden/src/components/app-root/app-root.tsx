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
          <ion-route url="/tags/:itemId" component="tag-page" />
          <ion-route url="/login" component="login-page" />
          <ion-route url="/register" component="register-page" />
          <ion-route url="/forgot-password" component="forgot-password-page" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
