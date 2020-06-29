import { store } from './store';

class ItemSyncServiceController {
  fetchAll(): void {
    store.db.dataset('Items')
      .select()
      .subscribe(
        (records) => {
          console.log('ITEM SYNC GET ALL');
          console.log(records);
          store.set('items', records);
        },
        (error) => console.error(error)
      );
  }
}

export const ItemSyncService = new ItemSyncServiceController();
