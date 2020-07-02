import { Component, Prop, h, State } from '@stencil/core';
import parseISO from 'date-fns/parseISO';
import formatISO from 'date-fns/formatISO';
import { ReminderService } from '../../services/reminder';

@Component({
  tag: 'reminder-form'
})
export class Reminder {
  @Prop() itemId: string;
  @State() form = {
    name: '',
    date: '',
    time: ''
  };
  
  updateValue(evt, name: string) {
    this.form[name] = evt.target.value;
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let reminder = ReminderService.getReminder(this.itemId);

    reminder.name = this.form.name;
    let date = parseISO(this.form.date);
    let time = parseISO(this.form.time);
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    reminder.datetime = formatISO(date);

    ReminderService.updateReminder(this.itemId, reminder);
  }

  checkForSavedData() {
    const reminder = ReminderService.getReminder(this.itemId);

    if (!this.form.date && !this.form.time && reminder && reminder.datetime) {
      this.form.date = reminder.datetime;
      this.form.time = reminder.datetime;
    }
    if (!this.form.name && reminder && reminder.name) {
      this.form.name = reminder.name;
    }
  }

  render() {
    this.checkForSavedData();

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
