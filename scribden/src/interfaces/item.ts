import { ChecklistType } from './checklist';
import { NoteType } from './note';
import { ReminderType } from './reminder';

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
  Reminders?: ReminderType
}
