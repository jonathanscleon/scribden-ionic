import { NoteService } from './note';
import { store } from './store';

class BehaviorServiceController {
  fetchBehaviors(itemId: string): void {
    NoteService.fetchNote(itemId);
    // @TODO: other behaviors
  }

  getBehaviors(itemId: string): any {
    return store.getBehaviors(itemId);
  }
}

export const BehaviorService = new BehaviorServiceController();
