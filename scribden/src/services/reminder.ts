import { ItemService } from '../services/item';
import { ItemType } from '../interfaces/item';
import { ReminderType } from '../interfaces/reminder';

class ReminderServiceController {
    private getItem(itemId: string): ItemType {
        return ItemService.getItem(itemId);
    }

    createReminder(item: ItemType): void {
        item.behaviors.reminder = {};

        ItemService.updateItem(item);
    }

    getReminder(itemId: string): ReminderType {
        let item: ItemType = this.getItem(itemId);

        return item && item.behaviors.reminder;
    }

    updateReminder(itemId: string, reminder: ReminderType): void {
        let item: ItemType = this.getItem(itemId);
        item.behaviors.reminder = reminder;

        ItemService.updateItem(item);
    }

    deleteReminder(itemId: string): void {
        let item: ItemType = this.getItem(itemId);
        delete item.behaviors.reminder;

        ItemService.updateItem(item);
    }
}

export const ReminderService = new ReminderServiceController();
