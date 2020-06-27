import { Component, Prop, h, State } from '@stencil/core';

@Component({
    tag: 'quick-add'
})
export class QuickAddItem {
    @Prop() add: Function;
    @Prop() label: string;
    @State() value: string;

    updateValue(evt) {
        this.value = evt.target.value;
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.value) {
            this.add(this.value);
            this.value = '';
        }
    }

    render() {
        return (<form onSubmit={(evt) => this.handleSubmit(evt)}>
        <ion-item>
            <ion-label position="fixed">{this.label}:</ion-label>
            <ion-input
                name="value"
                type="text"
                value={this.value}
                required
                onInput={evt => this.updateValue(evt)}
            ></ion-input>
            <ion-button type="submit">Add</ion-button>
        </ion-item>
        </form>);
    }
}
