import { Component, Prop, State, h } from '@stencil/core';
import { presentBehaviorActionSheet } from '../behaviors-action-sheet/behaviors-action-sheet';
import { ItemType } from '../../interfaces/item';

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
    /*
    const checklist = ChecklistService.getList(this.item.id);
    const note = NoteService.getNote(this.item.id);
    const reminder = ReminderService.getReminder(this.item.id);
    const tags = TagService.getTags(this.item.id);
    */

    if (this.item.Checklists) {
      summary.push(
        <ion-item>
          <ion-router-link href={`/checklist/${this.item.id}`}>
            Tasks
          </ion-router-link>
        </ion-item>
      );
    }
    if (this.item.Notes) {
      summary.push(
        <ion-item>
          <ion-router-link href={`/note/${this.item.id}`}>
            {this.item.Notes.text.substring(0, Math.min(200, this.item.Notes.text.length))}...
          </ion-router-link>
        </ion-item>
      )
    }
    if (this.item.Reminders) {
      summary.push(
        <ion-item>
          <ion-router-link href={`/reminder/${this.item.id}`}>
            Reminder
          </ion-router-link>
        </ion-item>
      )
    }
    /*
    if (tags && tags.length) {
        summary.push(
            <ion-item>
                <ion-router-link href={`/tag/${this.item.id}`}>
                    <ion-item-group>
                        {tags.map((tag) => (
                            <ion-chip>
                                <ion-label>{tag}</ion-label>
                            </ion-chip>
                        ))}
                    </ion-item-group>
                </ion-router-link>
            </ion-item>
        )
    }
    */

    if (this.isVisible) {
      return [listItem, ...summary];
    } else {
      return listItem;
    }
  }
}
