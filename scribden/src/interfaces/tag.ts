export interface TagType {
  id: string,
  tagListId: string,
  name: string,
  created_at: string,
  updated_at: string
}
export type TagListType = {
  id: string,
  itemId: string,
  created_at: string,
  updated_at: string,
  Tags: Array<TagType>
}

