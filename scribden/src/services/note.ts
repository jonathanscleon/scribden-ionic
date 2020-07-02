import { NoteType } from '../interfaces/note';
import { store } from './store';

class NoteServiceController {
  fetchNote(itemId: string): void {
    store.db.dataset('Notes')
      .select()
      .where(field => field('itemId').isEqualTo(itemId))
      .subscribe((records) => {
        const item = store.getItem(itemId);
        item.Notes = records[0];
        store.setItem(item);
      },
        (error) => console.error(error)
      );
  }

  createNote(itemId: string): void {
    store.db.dataset('Notes')
      .insert({ itemId })
      .subscribe((records) => {
        const item = store.getItem(itemId);
        item.Notes = records[0];
        store.setItem(item);

        // update the relation between the item and its note
        store.db.dataset('Items')
          .attach('Notes', records)
          .where(field => field('id').isEqualTo(itemId))
          .subscribe((records) => console.log(records));
      },
        (error) => console.error(error)
      );
  }

  getNote(itemId: string): NoteType {
    return store.getItem(itemId).Notes;
  }

  updateNote(itemId: string, text: string): void {
    store.db.dataset('Notes')
      .update({ text })
      .where(field => field('itemId').isEqualTo(itemId))
      .subscribe((records) => {
        const item = store.getItem(itemId);
        item.Notes = records[0];
        store.setItem(item);
      },
        (error) => console.error(error)
      );
  }

  deleteNote(itemId: string): void {
    store.db.dataset('Notes')
      .delete()
      .where(field => field('itemId').isEqualTo(itemId))
      .subscribe(() => {
        const item = store.getItem(itemId);
        item.Notes = null;
        store.setItem(item);
      },
        (error) => console.error(error)
      );
  }
}

export const NoteService = new NoteServiceController();
