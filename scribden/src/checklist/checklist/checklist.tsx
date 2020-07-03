import { Component, Prop, h, State } from '@stencil/core';
import { ChecklistService } from '../checklist-service';
import { ChecklistItemType } from '../checklist-interface';

@Component({
  tag: 'check-list'
})
export class Checklist {
  @Prop() itemId: string;
  @State() lastCheckedItem;

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

  render() {
    // reset checked state due to ionic issue
    if (this.lastCheckedItem) {
      this.lastCheckedItem.checked = false;
    }

    const list = ChecklistService.getList(this.itemId);
    console.log(`RENDERING CHECKLIST: ${list && list.ChecklistItems && list.ChecklistItems.length}`);
    console.log(list);
    return [
      <quick-add
        label='New Task'
        add={(value: string) => ChecklistService.addListItem(this.itemId, list.id, value)}
        disabled={!!!list}
      ></quick-add>,
      <ion-list>
        {list && list.ChecklistItems && list.ChecklistItems.map((todo) => (
          <ion-item>
            <ion-checkbox
              onClick={(evt) => this.completeListItem(evt, todo)}
              slot="start"
              checked={false}
            ></ion-checkbox>
            <ion-input
              name="value"
              type="text"
              value={todo.name}
              required
              onInput={evt => this.updateListItem(evt, todo)}
            ></ion-input>
          </ion-item>
        ))}
      </ion-list>
    ];
  }
}
