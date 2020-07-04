import mudder from 'mudder';
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

  private sortListItemsByPosition(checklist: ChecklistType) {
    if (checklist.ChecklistItems && checklist.ChecklistItems.length) {
      return checklist.ChecklistItems.sort(function(a, b) {
        if (a.position < b.position) {
          return -1;
        } else if (a.position > b.position) {
          return 1;
        } else {
          // positions must be equal
          return 0;
        }
      });
    } else {
      return [];
    }
  }
  
  getList(itemId: string): ChecklistType {
    const checklist = store.getItem(itemId).Checklists;
    checklist.ChecklistItems = this.sortListItemsByPosition(checklist);

    return checklist;
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

  addListItem(itemId: string, checklistId: string, name: string, position: string): void {
    // add a checklist item
    store.db.dataset('ChecklistItems')
      .insert({ checklistId, name, position })
      .subscribe((records) => {
        // update the state
        const item = store.getItem(itemId);
        item.Checklists.ChecklistItems = [
          records[0],
          ...item.Checklists.ChecklistItems
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
    // not allowed to update id, created_at, updated_at, so don't submit it
    store.db.dataset('ChecklistItems')
      .update({
        name: checklistItem.name,
        position: checklistItem.position
      })
      .where(field => field('id').isEqualTo(checklistItem.id))
      .subscribe(() => {
        const item = store.getItem(itemId);
        const idx = item.Checklists.ChecklistItems.findIndex((listItem) => listItem.id === checklistItem.id);
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

  reorderListItem(itemId: string, checklistItem: ChecklistItemType, targetIdx: number) {
    const item = store.getItem(itemId);
    let startPositionStr = '';
    let endPositionStr = '';

    // get the position strings of the two list items that the item will be inserted
    // in between, when applicable
    if (targetIdx === 0) {
      // beginning of the list
      endPositionStr = item.Checklists.ChecklistItems[0].position;
    } else if (targetIdx === (item.Checklists.ChecklistItems.length - 1)) {
      // between two items
      startPositionStr = item.Checklists.ChecklistItems[targetIdx].position;
    } else {
      // end of the list
      startPositionStr = item.Checklists.ChecklistItems[targetIdx - 1].position;
      endPositionStr = item.Checklists.ChecklistItems[targetIdx].position;
    }
    
    // update the position so that it can be sorted correctly
    const newPosition = mudder.base62.mudder(startPositionStr, endPositionStr, 100)[0];
    checklistItem.position = newPosition;
    const idx = item.Checklists.ChecklistItems.findIndex((listItem) => listItem.id === checklistItem.id);

    // remove it from the old position
    item.Checklists.ChecklistItems.splice(idx, 1);
    // move it to the new position
    item.Checklists.ChecklistItems.splice(targetIdx, 0, checklistItem);
    // make the update locally
    store.setItem(item);
    // persist the change on the server
    this.updateListItem(itemId, checklistItem);
  }
}

export const ChecklistService = new ChecklistServiceController();
