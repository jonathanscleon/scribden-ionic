import { ReminderType } from './reminder-interface';
import { store } from '../root/store';

class ReminderServiceController {
  fetchReminder(itemId: string) {
    store.db.dataset('Reminders')
      .select()
      .where(field => field('itemId').isEqualTo(itemId))
      .subscribe((records) => {
        const item = store.getItem(itemId);
        item.Reminders = records[0];
        store.setItem(item);
      },
        (error) => console.error(error)
      );
  }

  createReminder(itemId: string): void {
    store.db.dataset('Reminders')
      .insert({ itemId })
      .subscribe((records) => {
        const item = store.getItem(itemId);
        item.Reminders = records[0];
        store.setItem(item);

        // update the relation between the item and its reminder
        store.db.dataset('Items')
          .attach('Reminders', records)
          .where(field => field('id').isEqualTo(itemId))
          .subscribe((records) => console.log(records));
      },
        (error) => console.error(error)
      );
  }

  getReminder(itemId: string): ReminderType {
    return store.getItem(itemId).Reminders;
  }

  updateReminder(itemId: string, reminder: ReminderType): void {
    store.db.dataset('Reminders')
      .update(reminder)
      .where(field => field('itemId').isEqualTo(itemId))
      .subscribe((records) => {
        const item = store.getItem(itemId);
        item.Reminders = records[0];
        store.setItem(item);
      },
        (error) => console.error(error)
      );
  }

  deleteReminder(itemId: string): void {
    store.db.dataset('Reminders')
      .delete()
      .where(field => field('itemId').isEqualTo(itemId))
      .subscribe(() => {
        const item = store.getItem(itemId);
        item.Reminders = null;
        store.setItem(item);
      },
        (error) => console.error(error)
      );
  }
}

export const ReminderService = new ReminderServiceController();
