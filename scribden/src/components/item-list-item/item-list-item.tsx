import { Component, Prop, State, h } from '@stencil/core';
import { presentBehaviorActionSheet } from '../behaviors-action-sheet/behaviors-action-sheet';
import { ItemType } from '../../interfaces/item';
import { ChecklistService } from '../../services/checklist';
import { NoteService } from '../../services/note';
import { ReminderService } from '../../services/reminder';

@Component({
    tag: 'item-list-item'
})
export class ItemListItem {
    @Prop() item: ItemType;
    @State() isVisible: Boolean = false;

    toggleVisibility() {
        this.isVisible = !this.isVisible;
    }

    render() {
        const showDetailIcon = this.isVisible ? "caret-down-outline" : "caret-forward-outline";

        const listItem = <ion-item>
            <ion-button slot="start" onClick={() => this.toggleVisibility()}>
                <ion-icon name={`${showDetailIcon}`}></ion-icon>
            </ion-button>
            <ion-router-link href={`/detail/${this.item.id}`}>
                {this.item.name}
            </ion-router-link>
            <ion-button slot="end" onClick={() => presentBehaviorActionSheet(this.item)}>
                <ion-icon name="add-outline"></ion-icon>
            </ion-button>
        </ion-item>;
        
        const summary = [];
        const checklist = ChecklistService.getList(this.item.id);
        const note = NoteService.getNote(this.item.id);
        const reminder = ReminderService.getReminder(this.item.id);

        if (checklist) {
            summary.push(
                <ion-item>
                    <ion-router-link href={`/checklist/${this.item.id}`}>
                        {checklist.length} tasks
                    </ion-router-link>
                </ion-item>
            );
        }
        if (typeof note === 'string') {
            summary.push(
                <ion-item>
                    <ion-router-link href={`/note/${this.item.id}`}>
                        {note.substring(0, Math.min(200, note.length))}...
                    </ion-router-link>
                </ion-item>
            )
        }
        if (reminder) {
            summary.push(
                <ion-item>
                    <ion-router-link href={`/reminder/${this.item.id}`}>
                        Reminder
                    </ion-router-link>
                </ion-item>
            )
        }
        
        if (this.isVisible) {
            return [listItem, ...summary];
        } else {
            return listItem;
        }
    }
}
