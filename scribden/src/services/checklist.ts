import { ItemService } from '../services/item';
import { ItemType } from '../interfaces/item';
import { ChecklistType } from '../interfaces/checklist';

class ChecklistServiceController {
    private getItem(itemId: number): ItemType {
        return ItemService.getItem(itemId);
    }

    createList(item: ItemType): void {
        item.behaviors.checklist = [];

        ItemService.updateItem(item);
    }

    getList(itemId: number): ChecklistType {
        let item: ItemType = this.getItem(itemId);

        return item && item.behaviors.checklist;
    }

    updateList(itemId: number, checklist: ChecklistType): void {
        let item: ItemType = this.getItem(itemId);
        item.behaviors.checklist = checklist;

        ItemService.updateItem(item);
    }

    deleteList(itemId: number): void {
        let item: ItemType = this.getItem(itemId);
        delete item.behaviors.checklist;

        ItemService.updateItem(item);
    }

    addListItem(itemId: number, todo: string): void {
        let checklist: ChecklistType = this.getList(itemId);
        ChecklistService.updateList(
            itemId,
            [todo, ...checklist]
        );
    }

    updateListItem(itemId: number, idx: number, value: string) {
        let checklist: ChecklistType = this.getList(itemId);
        ChecklistService.updateList(
            itemId,
            checklist.map((todo, index) => (
                index === idx ? value: todo
            ))
        );
    }

    deleteListItem(itemId: number, idx: number) {
        let checklist = this.getList(itemId);
        checklist.splice(idx, 1);
        ChecklistService.updateList(
            itemId,
            checklist
        );
    }
}

export const ChecklistService = new ChecklistServiceController();
