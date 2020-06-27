import { Component, Prop, h } from '@stencil/core';
import { ItemType } from '../../interfaces/item';
import { NoteService } from '../../services/note';

@Component({
    tag: 'note-editor'
})
export class Note {
    @Prop() item: ItemType;

    updateNote(evt) {
        const value = evt.target.value;

        console.log('updating note...');
        console.log(value);
        NoteService.updateNote(this.item.id, value);
    }

    render() {
        const note = NoteService.getNote(this.item.id);

        return (
            <ion-item>
                <ion-label position="stacked">Note</ion-label>
                <ion-textarea
                    autoGrow
                    autofocus
                    debounce={300}
                    onIonChange={(evt) => this.updateNote(evt)}
                    value={note}
                ></ion-textarea>
            </ion-item>
        );
    }
}
