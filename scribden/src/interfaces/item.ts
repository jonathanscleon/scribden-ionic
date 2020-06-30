export interface ItemType {
    id?: string,
    name: string,
    parentId: number,
    isFolder: boolean,
    behaviors?: any,
    created_at?: string,
    updated_at?: string
}
