import { createStore } from '@stencil/store';
import { get, set } from './storage';
import { db } from './syncStore';

// @TODO: optimize
const shouldUpdate = () => true;

const { state, on } = createStore({
    db,
    items: [],
}, shouldUpdate);

(async () => {
    state.items = (await get('items')) || [];
})();

// update local storage whenever a value changes
on('set', (key, newValue) => {
    set(key, newValue);
});

export const store = {
    get: (key: string) => state[key], // local store only calls here
    fetch: (key: string) => {}, // @TODO; make db calls here
    set: (key: string, value: any) => state[key] = value
};
