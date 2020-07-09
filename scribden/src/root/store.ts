import { createStore } from '@stencil/store';
// import { get, set } from './storage';
import { db, ums } from './syncStore';
import { ItemType } from '../item/item-interface';

// @TODO: optimize
const shouldUpdate = () => true;

// const { state, on } = createStore({
const { state } = createStore({
  items: [],
  behaviors: {} // hash by item id
}, shouldUpdate);
/*
(async () => {
    state.items = (await get('items')) || [];
})();

// update local storage whenever a value changes
on('set', (key, newValue) => {
    set(key, newValue);
});
*/
export const store = {
  db,
  ums,
  get: (key: string) => state[key],
  getItem: (itemId: string): ItemType => state.items &&
    state.items.filter(item => item.id === itemId)[0],
  // update item  
  setItem: (newItem: ItemType) => {
    if (state.items.length) {
      state.items = state.items.map((item) => item.id === newItem.id ? newItem : item)
    } else {
      state.items = [newItem];
    }
  },
  set: (key: string, value: any) => state[key] = value
};
