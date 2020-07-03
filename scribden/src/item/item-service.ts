import { store } from '../root/store';
import { ItemType } from './item-interface';

class ItemServiceController {
  getAll(): ItemType[] {
    return store.get('items');
  }

  getItem(id: string): ItemType {
    return store.get('items').find(item => item.id === id);
  }

  fetchAll(): void {
    store.db.dataset('Items')
      .select()
      .related('Checklists', checklists => checklists
        .related('ChecklistItems'))
      .related('Notes')
      .related('Reminders')
      .related('TagLists', tagLists => tagLists
        .related('Tags'))
      .subscribe((records) => {
        console.log(records);
        store.set('items', records);
      },
        (error) => console.error(error)
      );
  }

  fetchItem(itemId: string): void {
    store.db.dataset('Items')
      .select()
      .related('Checklists', checklists => checklists
        .related('ChecklistItems'))
      .related('Notes')
      .related('Reminders')
      .related('TagLists', tagLists => tagLists
        .related('Tags'))
      .where(field => field('id').isEqualTo(itemId))
      .subscribe((records) => {
        const items = store.get('items');
        
        if (items.length) {
          store.set('items', items.map(item =>
            item.id === itemId ? records[0] : item
          ));
        } else {
          store.set('items', records);
        }
      },
        (error) => console.error(error)
      );
  }

  createItem(name: string): void {
    store.db.dataset('Items')
      .insert({ name })
      .subscribe((records) => {
        const items = store.get('items');
        store.set('items', [...items, ...records]);
      },
        (error) => console.error(error)
      );
  }

  updateItem(item: ItemType): void {
    store.db.dataset('Items')
      .update(item)
      .where(field => field('id').isEqualTo(item.id))
      .subscribe((records) => {
        const items = store.get('items');
        store.set('items', items.map(i =>
          i.id === item.id ? records[0] : i
        ));
      },
        (error) => console.error(error)
      );
  }

  deleteItem(itemId: string): void {
    store.db.dataset('Items')
      .delete()
      .where(field => field('id').isEqualTo(itemId))
      .subscribe(() => {
        const items = store.get('items');
        store.set('items', items.filter(item => item.id !== itemId));
      },
        (error) => console.error(error)
      );
  }
}

export const ItemService = new ItemServiceController();
