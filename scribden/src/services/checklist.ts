import { ItemService } from '../services/item';
import { ItemType } from '../interfaces/item';
import { ChecklistType } from '../interfaces/checklist';

class ChecklistServiceController {
    private getItem(itemId: string): ItemType {
        return ItemService.getItem(itemId);
    }

    createList(item: ItemType): void {
        item.behaviors.checklist = [];

        ItemService.updateItem(item);
    }

    getList(itemId: string): ChecklistType {
        let item: ItemType = this.getItem(itemId);

        return item && item.behaviors.checklist;
    }

    updateList(itemId: string, checklist: ChecklistType): void {
        let item: ItemType = this.getItem(itemId);
        item.behaviors.checklist = checklist;

        ItemService.updateItem(item);
    }

    deleteList(itemId: string): void {
        let item: ItemType = this.getItem(itemId);
        delete item.behaviors.checklist;

        ItemService.updateItem(item);
    }

    addListItem(itemId: string, todo: string): void {
        let checklist: ChecklistType = this.getList(itemId);
        ChecklistService.updateList(
            itemId,
            [todo, ...checklist]
        );
    }

    updateListItem(itemId: string, idx: number, value: string) {
        let checklist: ChecklistType = this.getList(itemId);
        ChecklistService.updateList(
            itemId,
            checklist.map((todo, index) => (
                index === idx ? value: todo
            ))
        );
    }

    deleteListItem(itemId: string, idx: number) {
        let checklist = this.getList(itemId);
        checklist.splice(idx, 1);
        ChecklistService.updateList(
            itemId,
            checklist
        );
    }
}

export const ChecklistService = new ChecklistServiceController();
