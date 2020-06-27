import { Component, Prop, h, State } from '@stencil/core';
import { ItemType } from '../../interfaces/item';
import { ChecklistService } from '../../services/checklist';

@Component({
    tag: 'check-list'
})
export class Checklist {
    @Prop() item: ItemType;
    @State() deleteItemIdQueue: number = -1;

    updateListItem(evt, idx: number) {
        ChecklistService.updateListItem(this.item.id, idx, evt.target.value);
    }

    completeListItem(evt, idx: number) {
        // ion-checkbox does not emit transition/animation end events.
        // looked at the source code and the transition time is set to 180ms.
        setTimeout(() => {
            // ion-checkbox unfortunately manages its own state,
            // so it updates when clicking and ignores the property.
            // there's also a bug where removing a checkbox from a list
            // for some reason has the checkbox at that index inherit the
            // removed checkbox state.
            evt.target.checked = false;
            ChecklistService.deleteListItem(this.item.id, idx);
        }, 500);
    }

    render() {
        return [
            <quick-add
                label='New Task'
                add={(value: string) => ChecklistService.addListItem(this.item.id, value)}
            ></quick-add>,
            <ion-list>
                {ChecklistService.getList(this.item.id).map((todo, idx) => (
                    <ion-item>
                        <ion-checkbox
                            onClick={(evt) => this.completeListItem(evt, idx)}
                            slot="start"
                        ></ion-checkbox>
                        <ion-input
                            name="value"
                            type="text"
                            value={todo}
                            required
                            onInput={evt => this.updateListItem(evt, idx)}
                        ></ion-input>
                    </ion-item>
                ))}
            </ion-list>
        ];
    }
}
