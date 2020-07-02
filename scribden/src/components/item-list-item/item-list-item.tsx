import { Component, Prop, State, h } from '@stencil/core';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
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

    if (this.item.Checklists) {
      summary.push(
        <ion-item>
          <ion-router-link href={`/checklist/${this.item.id}`}>
            {(this.item.Checklists.ChecklistItems && this.item.Checklists.ChecklistItems.length) || 0} Task(s)
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
      let timeStr = '';
      if (this.item.Reminders.datetime) {
        timeStr = `on ${format(parseISO(this.item.Reminders.datetime), 'PPPPpppp')}`;
      }

      summary.push(
        <ion-item>
          <ion-router-link href={`/reminder/${this.item.id}`}>
            {this.item.Reminders.name} {timeStr}
          </ion-router-link>
        </ion-item>
      )
    }
    if (this.item.TagLists) {
        summary.push(
            <ion-item>
                <ion-router-link href={`/tags/${this.item.id}`}>
                    <ion-item-group>
                        {
                        (this.item.TagLists.Tags && this.item.TagLists.Tags.length > 0) ? 
                        this.item.TagLists.Tags.map((tag) => (
                            <ion-chip>
                                <ion-label>{tag.name}</ion-label>
                            </ion-chip>
                        )) : 'No tags yet'
                        }
                    </ion-item-group>
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
