import { ItemService } from '../services/item';
import { ItemType } from '../interfaces/item';

class NoteServiceController {
    private getItem(itemId: number): ItemType {
        return ItemService.getItem(itemId);
    }

    createNote(item: ItemType): void {
        item.behaviors.note = '';

        ItemService.updateItem(item);
    }

    getNote(itemId: number): string {
        let item: ItemType = this.getItem(itemId);

        return item && item.behaviors.note;
    }

    updateNote(itemId: number, text: string): void {
        let item: ItemType = this.getItem(itemId);
        item.behaviors.note = text;

        ItemService.updateItem(item);
    }

    deleteNote(itemId: number): void {
        let item: ItemType = this.getItem(itemId);
        delete item.behaviors.note;

        ItemService.updateItem(item);
    }
}

export const NoteService = new NoteServiceController();
