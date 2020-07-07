import { Component, h } from '@stencil/core';
import { AuthService } from '../auth-service';

@Component({
  tag: 'home-page'
})
export class HomePage {
  logout() {
    AuthService.logout();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>ScribDen - Home</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-router-link href={'/login'}>
              Login
            </ion-router-link>
          </ion-item>
          <ion-item>
            <ion-router-link href={'/register'}>
              Register
            </ion-router-link>            
          </ion-item>
          <ion-item>
            <ion-button onClick={() => this.logout()}>Logout</ion-button>
          </ion-item>
          <ion-item>
            <ion-router-link href={'/items'}>
              Home
            </ion-router-link>
          </ion-item>
        </ion-list>
      </ion-content>
    ];
  }
}
