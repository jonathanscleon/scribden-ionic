import { TagListType, TagType } from './tag-interface';
import { store } from '../root/store';

class TagServiceController {
  fetchList(itemId: string): void {
    store.db.dataset('TagLists')
      .select()
      .where(field => field('itemId').isEqualTo(itemId))
      .related('Tags')
      .subscribe((records) => {
        const item = store.getItem(itemId);
        item.TagLists = records[0];
        store.setItem(item);
      },
        (error) => console.error(error)
      );
  }

  createList(itemId: string): void {
    store.db.dataset('TagLists')
      .insert({ itemId })
      .subscribe((records) => {
        const item = store.getItem(itemId);
        item.TagLists = records[0];
        store.setItem(item);

        // update the relation between the item and its checklist
        store.db.dataset('Items')
          .attach('TagLists', records)
          .where(field => field('id').isEqualTo(itemId))
          .subscribe(() => {});
      },
        (error) => console.error(error)
      );
  }

  getList(itemId: string): TagListType {
    return store.getItem(itemId).TagLists;
  }

  deleteList(itemId: string): void {
    store.db.dataset('TagLists')
      .delete()
      .where(field => field('itemId').isEqualTo(itemId))
      .subscribe(() => {
        const item = store.getItem(itemId);
        item.TagLists = null;
        store.setItem(item);
      })
  }

  addTag(itemId: string, tagListId: string, name: string): void {
    // add a checklist item
    store.db.dataset('Tags')
      .insert({ tagListId, name })
      .subscribe((records) => {
        // update the state
        const item = store.getItem(itemId);
        item.TagLists.Tags = [
          ...item.TagLists.Tags,
          records[0]
        ];
        store.setItem(item);

        // update the relation between the checklist and its items
        store.db.dataset('TagLists')
          .attach('Tags', records)
          .where(field => field('id').isEqualTo(tagListId))
          .subscribe(() => {});
      })
  }

  updateTag(itemId: string, tag: TagType) {
    store.db.dataset('Tags')
      .update(tag)
      .where(field => field('id').isEqualTo(tag.id))
      .subscribe(() => {
        const item = store.getItem(itemId);
        const idx = item.TagLists.Tags.indexOf(tag);
        item.TagLists.Tags[idx] = tag;
        store.setItem(item);
      })
  }

  deleteTag(itemId: string, tag: TagType) {
    store.db.dataset('Tags')
      .delete()
      .where(field => field('id').isEqualTo(tag.id))
      .subscribe(() => {
        const item = store.getItem(itemId);
        const idx = item.TagLists.Tags.indexOf(tag);
        item.TagLists.Tags.splice(idx, 1);
        store.setItem(item);
      })
  }
}

export const TagService = new TagServiceController();
