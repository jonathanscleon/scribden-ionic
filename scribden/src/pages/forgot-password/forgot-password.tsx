import { Component, h, State } from '@stencil/core';
import { AuthService } from '../../services/auth';

@Component({
  tag: 'forgot-password-page'
})
export class ForgotPasswordPage {
  @State() email: string;

  updateValue(evt) {
    this.email = evt.target.value;
  }

  handleSubmit() {
    AuthService.forgotPassword(this.email);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>ScribDen - Forgot Password</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content class="ion-padding">
        <form
          onSubmit={() => this.handleSubmit()}
        >
          <ion-item>
            <ion-label>Email</ion-label>
            <ion-input
              name="email"
              type="email"
              onInput={(evt) => this.updateValue(evt)}
            ></ion-input>
          </ion-item>
          <ion-button
            type="submit"
          >Reset Password</ion-button>
        </form>
      </ion-content>
    ];
  }
}
