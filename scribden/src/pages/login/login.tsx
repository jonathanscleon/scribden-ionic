import { Component, h, State } from '@stencil/core';
import { AuthService } from '../../services/auth';

@Component({
    tag: 'login-page'
})
export class LoginPage {
    @State() form = {
        email: '',
        password: ''
    }

    updateValue(evt, label: string) {
        this.form[label] = evt.target.value;
    }

    handleSubmit() {
        AuthService.login(this.form.email, this.form.password);
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>ScribDen - Login</ion-title>
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
                            onInput={(evt) => this.updateValue(evt, 'email')}
                        ></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label>Password</ion-label>
                        <ion-input
                            name="password"
                            type="password"
                            onInput={(evt) => this.updateValue(evt, 'password')}
                        ></ion-input>
                    </ion-item>
                    <ion-button type="submit">Login</ion-button>
                    <ion-item-group>
                        <ion-item>
                            <ion-router-link href={`/forgot-password`}>
                                Forgot your password?
                            </ion-router-link>
                        </ion-item>
                        <ion-item>
                            <ion-router-link href={`/register`}>
                                Don't have an account? Sign up here
                            </ion-router-link>
                        </ion-item>
                    </ion-item-group>
                </form>
            </ion-content>
        ];
    }
}
