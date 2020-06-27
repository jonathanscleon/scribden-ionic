import { Component, Prop, h, State } from '@stencil/core';
import { ItemType } from '../../interfaces/item';
import { ReminderService } from '../../services/reminder';
import { ReminderType } from '../../interfaces/reminder';

@Component({
    tag: 'reminder-form'
})
export class Reminder {
    @Prop() item: ItemType;
    @State() form: ReminderType = {
        name: '',
        date: '',
        time: ''
    };

    componentDidLoad() {
        this.form = ReminderService.getReminder(this.item.id);
    }

    updateValue(evt, name: string) {
        this.form[name] = evt.target.value;
    }

    handleSubmit(evt) {
        evt.preventDefault();
        ReminderService.updateReminder(this.item.id, this.form);
    }

    render() {
        return (
            <form
                onSubmit={(evt) => this.handleSubmit(evt)}
            >
                <ion-item>
                    <ion-label position="fixed">Name</ion-label>
                    <ion-input
                        placeholder="Remind me to..."
                        name="name"
                        onInput={(evt) => this.updateValue(evt, 'name')}
                        value={this.form.name}
                    ></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="fixed">Date</ion-label>
                    <ion-datetime
                        name="date"
                        displayFormat={'MMM D YYYY'}
                        onIonChange={(evt) => this.updateValue(evt, 'date')}
                        value={this.form.date}
                    ></ion-datetime>
                </ion-item>
                <ion-item>
                    <ion-label position="fixed">Time</ion-label>
                    <ion-datetime
                        name="time"
                        displayFormat={'h mm A'}
                        onIonChange={(evt) => this.updateValue(evt, 'time')}
                        value={this.form.time}
                    ></ion-datetime>
                </ion-item>
                <ion-button type="submit">Save</ion-button>
            </form>
        );
    }
}
