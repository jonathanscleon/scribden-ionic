import { store } from './store';
import { ItemType } from '../interfaces/item';

class ItemServiceController {
  getAll(): ItemType[] {
    return store.get('items');
  }
  
  getItem(id: number): ItemType {
    return store.get('items').find(item => item.id === id);
  }

  createItem(name: string): void {
    const items = store.get('items');
    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...items.map(item => item.id), 0) + 1;

    store.set('items', [...items, {
      id,
      name,
      behaviors: {}
    }]);
  }

  updateItem(item: ItemType): void {
    const items = store.get('items');
    // Get the index in the array of the item that was passed in
    let index = items.indexOf(item);

    items[index] = item;
    
    store.set('items', items);
  }

  deleteItem(item: ItemType): void {
    const items = store.get('items');
    // Get the index in the array of the item that was passed in
    let index = items.indexOf(item);

    // Delete that element of the array and resave the data
    if (index > -1) {
      items.splice(index, 1);
      store.set('items', items);
    }
  }
}

export const ItemService = new ItemServiceController();
