export interface ChecklistItemType {
  id: string,
  checklistId: string,
  name: string,
  created_at: string,
  updated_at: string
}
export type ChecklistType = {
  id: string,
  itemId: string,
  created_at: string,
  updated_at: string,
  ChecklistItems: Array<ChecklistItemType>
}

