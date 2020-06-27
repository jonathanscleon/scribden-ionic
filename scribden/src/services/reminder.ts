import { ItemService } from '../services/item';
import { ItemType } from '../interfaces/item';
import { ReminderType } from '../interfaces/reminder';

class ReminderServiceController {
    private getItem(itemId: number): ItemType {
        return ItemService.getItem(itemId);
    }

    createReminder(item: ItemType): void {
        item.behaviors.reminder = {};

        ItemService.updateItem(item);
    }

    getReminder(itemId: number): ReminderType {
        let item: ItemType = this.getItem(itemId);

        return item && item.behaviors.reminder;
    }

    updateReminder(itemId: number, reminder: ReminderType): void {
        let item: ItemType = this.getItem(itemId);
        item.behaviors.reminder = reminder;

        ItemService.updateItem(item);
    }

    deleteReminder(itemId: number): void {
        let item: ItemType = this.getItem(itemId);
        delete item.behaviors.reminder;

        ItemService.updateItem(item);
    }
}

export const ReminderService = new ReminderServiceController();
