import { NoteType } from '../interfaces/note';
import { store } from './store';

class NoteServiceController {
  fetchNote(itemId: string): void {
    store.db.dataset('Notes')
      .select()
      .where(field => field('itemId').isEqualTo(itemId))
      .subscribe((records) => {
        const behaviors = store.getBehaviors(itemId);
        behaviors.note = records[0];
        store.setBehaviors(itemId, behaviors);
      },
        (error) => console.error(error)
      );
  }

  createNote(itemId: string): void {
    store.db.dataset('Notes')
      .insert({ itemId })
      .subscribe((records) => {
        const behaviors = store.getBehaviors(itemId);
        behaviors.note = records[0];
        store.setBehaviors(itemId, behaviors);
      },
        (error) => console.error(error)
      );
  }

  getNote(itemId: string): NoteType {
    const behaviors = store.getBehaviors(itemId);
    return behaviors.note;
  }

  updateNote(itemId: string, text: string): void {
    store.db.dataset('Notes')
      .update({ text })
      .where(field => field('itemId').isEqualTo(itemId))
      .subscribe((records) => {
        const behaviors = store.getBehaviors(itemId);
        behaviors.note = records[0];
        store.setBehaviors(itemId, behaviors);
      },
        (error) => console.error(error)
      );
  }

  deleteNote(itemId: string): void {
    store.db.dataset('Notes')
      .delete()
      .where(field => field('itemId').isEqualTo(itemId))
      .subscribe(() => {
        const behaviors = store.getBehaviors(itemId);
        behaviors.note = null;
        store.setBehaviors(itemId, behaviors);
      },
        (error) => console.error(error)
      );
  }
}

export const NoteService = new NoteServiceController();
