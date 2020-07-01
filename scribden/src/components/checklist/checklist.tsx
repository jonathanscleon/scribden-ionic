import { Component, Prop, h, State } from '@stencil/core';
import { ItemType } from '../../interfaces/item';
import { ChecklistService } from '../../services/checklist';
import { ChecklistItemType } from '../../interfaces/checklist';

@Component({
    tag: 'check-list'
})
export class Checklist {
    @Prop() itemId: string;
    @State() lastCheckedItem;

    componentDidLoad() {
        ChecklistService.fetchChecklist(this.itemId);
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
        }, 500);
    }

    render() {
        // reset checked state due to ionic issue
        if (this.lastCheckedItem) {
            this.lastCheckedItem.checked = false;
        }

        const list = ChecklistService.getList(this.itemId);

        return [
            <quick-add
                label='New Task'
                add={(value: string) => ChecklistService.addListItem(this.itemId, list.id, value)}
            ></quick-add>,
            <ion-list>
                {list && list.ChecklistItems.map((todo) => (
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
