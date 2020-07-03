import { Component, Prop, h } from '@stencil/core';
import { NoteService } from '../note-service';

@Component({
  tag: 'note-editor'
})
export class NoteEditor {
  @Prop() itemId: string;

  updateNote(evt) {
    const value = evt.target.value;
    NoteService.updateNote(this.itemId, value);
  }

  render() {
    const note = NoteService.getNote(this.itemId);

    return (
      <ion-item>
        <ion-label position="stacked">Note</ion-label>
        <ion-textarea
          autoGrow
          autofocus
          debounce={300}
          onIonChange={(evt) => this.updateNote(evt)}
          value={note && note.text}
        ></ion-textarea>
      </ion-item>
    );
  }
}
