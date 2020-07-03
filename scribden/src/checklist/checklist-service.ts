import { ChecklistItemType, ChecklistType } from './checklist-interface';
import { store } from '../root/store';

class ChecklistServiceController {
  fetchChecklist(itemId: string): void {
    store.db.dataset('Checklists')
      .select()
      .where(field => field('itemId').isEqualTo(itemId))
      .related('ChecklistItems')
      .subscribe((records) => {
        const item = store.getItem(itemId);
        item.Checklists = records[0];
        store.setItem(item);
      },
        (error) => console.error(error)
      );
  }

  createList(itemId: string): void {
    store.db.dataset('Checklists')
      .insert({ itemId })
      .subscribe((records) => {
        const item = store.getItem(itemId);
        item.Checklists = records[0];
        store.setItem(item);

        // update the relation between the item and its checklist
        store.db.dataset('Items')
          .attach('Checklists', records)
          .where(field => field('id').isEqualTo(itemId))
          .subscribe(() => {});
      },
        (error) => console.error(error)
      );
  }

  getList(itemId: string): ChecklistType {
    return store.getItem(itemId).Checklists;
  }

  deleteList(itemId: string): void {
    store.db.dataset('Checklists')
      .delete()
      .where(field => field('itemId').isEqualTo(itemId))
      .subscribe(() => {
        const item = store.getItem(itemId);
        item.Checklists = null;
        store.setItem(item);
      })
  }

  addListItem(itemId: string, checklistId: string, name: string): void {
    // add a checklist item
    store.db.dataset('ChecklistItems')
      .insert({ checklistId, name })
      .subscribe((records) => {
        // update the state
        const item = store.getItem(itemId);
        item.Checklists.ChecklistItems = [
          ...item.Checklists.ChecklistItems,
          records[0]
        ];
        store.setItem(item);

        // update the relation between the checklist and its items
        store.db.dataset('Checklists')
          .attach('ChecklistItems', records)
          .where(field => field('id').isEqualTo(checklistId))
          .subscribe(() => {});
      })
  }

  updateListItem(itemId: string, checklistItem: ChecklistItemType) {
    store.db.dataset('ChecklistItems')
      .update(checklistItem)
      .where(field => field('id').isEqualTo(checklistItem.id))
      .subscribe(() => {
        const item = store.getItem(itemId);
        const idx = item.Checklists.ChecklistItems.indexOf(checklistItem);
        item.Checklists.ChecklistItems[idx] = checklistItem;
        store.setItem(item);
      })
  }

  deleteListItem(itemId: string, checklistItem: ChecklistItemType) {
    store.db.dataset('ChecklistItems')
      .delete()
      .where(field => field('id').isEqualTo(checklistItem.id))
      .subscribe(() => {
        const item = store.getItem(itemId);
        const idx = item.Checklists.ChecklistItems.indexOf(checklistItem);
        item.Checklists.ChecklistItems.splice(idx, 1);
        store.setItem(item);
      })
  }
}

export const ChecklistService = new ChecklistServiceController();
