import { Component, Prop, h, State } from '@stencil/core';
import { ItemReorderEventDetail } from '@ionic/core';
import mudder from 'mudder';
import { ChecklistService } from '../checklist-service';
import { ChecklistItemType, ChecklistType } from '../checklist-interface';

@Component({
  tag: 'check-list'
})
export class Checklist {
  @Prop() itemId: string;
  @State() lastCheckedItem;
  @State() dragAndDropDisabled = true;
  @State() reorderEvent: CustomEvent<ItemReorderEventDetail>;

  componentWillUpdate() {
    // reset checked state due to ionic issue
    if (this.lastCheckedItem) {
      this.lastCheckedItem.checked = false;
      this.lastCheckedItem = null;
    }
    // state has updated its order, finalize it in the UI
    if (this.reorderEvent) {
      this.reorderEvent.detail.complete();
      this.reorderEvent = null;
    }
  }

  addListItem(list: ChecklistType, value: string) {
    // add to the beginning of the list
    let position: string = '';
    if (list && list.ChecklistItems && list.ChecklistItems.length > 0) {
      // make sure position created is earlier than first item in list
      position = mudder.base62.mudder(list.ChecklistItems[list.ChecklistItems.length - 1].position, '', 100)[0];
    } else {
      position = mudder.base62.mudder(100)[0];
    }
    ChecklistService.addListItem(this.itemId, list.id, value, position);
  }

  updateListItem(evt, todo: ChecklistItemType) {
    todo.name = evt.target.value;
    ChecklistService.updateListItem(this.itemId, todo);
  }

  completeListItem(evt, todo: ChecklistItemType) {
    // ion-checkbox does not emit transition/animation end events.
    // looked at the source code and the transition time is set to 180ms.
    setTimeout(() => {
      ChecklistService.deleteListItem(this.itemId, todo);
      // ion-checkbox unfortunately manages its own state,
      // so it updates when clicking and ignores the property.
      // there's also a bug where removing a checkbox from a list
      // for some reason has the checkbox at that index inherit the
      // removed checkbox state.
      this.lastCheckedItem = evt.target;
    }, 300);
  }

  doReorder(evt: CustomEvent<ItemReorderEventDetail>) {
    const list = ChecklistService.getList(this.itemId);
    const listItemToMove = list.ChecklistItems[evt.detail.from];
    ChecklistService.reorderListItem(this.itemId, listItemToMove, evt.detail.to);
    this.reorderEvent = evt;
  }

  toggleDragAndDrop() {
    this.dragAndDropDisabled = !this.dragAndDropDisabled;
  }

  render() {
    const list = ChecklistService.getList(this.itemId);

    return [
      <quick-add
        label='New Task'
        add={(value: string) => this.addListItem(list, value)}
        disabled={!!!list}
      ></quick-add>,
      <ion-item>
        <ion-label>Reorder</ion-label>
        <ion-toggle
          slot="start"
          onIonChange={() => this.toggleDragAndDrop()}
        ></ion-toggle>
      </ion-item>,
      <ion-reorder-group
        disabled={this.dragAndDropDisabled}
        onIonItemReorder={(evt: CustomEvent<ItemReorderEventDetail>) => this.doReorder(evt)}
      >
        {list && list.ChecklistItems && list.ChecklistItems.map((todo) => (
          <ion-item>
            <ion-checkbox
              onClick={(evt) => this.completeListItem(evt, todo)}
              slot="start"
              checked={false}
            ></ion-checkbox>
            <ion-reorder>
              <ion-input
                name="value"
                type="text"
                value={todo.name}
                required
                onInput={evt => this.updateListItem(evt, todo)}
              ></ion-input>
            </ion-reorder>
          </ion-item>
        ))}
      </ion-reorder-group>
    ];
  }
}
