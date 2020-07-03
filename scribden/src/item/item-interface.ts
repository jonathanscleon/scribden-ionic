import { ChecklistType } from '../checklist/checklist-interface';
import { NoteType } from '../note/note-interface';
import { ReminderType } from '../reminder/reminder-interface';
import { TagListType } from '../tag/tag-interface';

export interface ItemType {
  id?: string,
  name: string,
  parentId: number,
  isFolder: boolean,
  behaviors?: any,
  created_at?: string,
  updated_at?: string,
  Checklists?: ChecklistType,
  Notes?: NoteType,
  Reminders?: ReminderType,
  TagLists?: TagListType
}
