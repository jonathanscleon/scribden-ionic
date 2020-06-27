import { Component, h, State } from '@stencil/core';
import { AuthService } from '../../services/auth';

@Component({
    tag: 'register-page'
})
export class RegisterPage {
    @State() form = {
        email: '',
        password: ''
    }

    updateValue(evt, label: string) {
        this.form[label] = evt.target.value;
    }

    handleSubmit() {
        AuthService.register(this.form.email, this.form.password);
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>ScribDen - Register</ion-title>
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
                    <ion-button type="submit">Register</ion-button>
                    <ion-item-group>
                        <ion-item>
                            <ion-router-link href={`/login`}>
                                Have an account? Login here
                            </ion-router-link>
                        </ion-item>
                    </ion-item-group>
                </form>
            </ion-content>
        ];
    }
}
