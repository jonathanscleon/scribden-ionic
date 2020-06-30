import { createStore } from '@stencil/store';
import { get, set } from './storage';
import { db } from './syncStore';

// @TODO: optimize
const shouldUpdate = () => true;

const { state, on } = createStore({
    items: [],
    behaviors: {} // hash by item id
}, shouldUpdate);

(async () => {
    state.items = (await get('items')) || [];
})();

// update local storage whenever a value changes
on('set', (key, newValue) => {
    set(key, newValue);
});

export const store = {
    db,
    get: (key: string) => state[key],
    getBehaviors: (itemId: string) => {
        if (!state.behaviors[itemId]) {
            state.behaviors[itemId] = {};
        }
        
        return state['behaviors'][itemId];
    },
    setBehaviors: (itemId: string, value: any) => {
        state.behaviors = {
            ...state.behaviors,
            [itemId]: value
        };
    },
    set: (key: string, value: any) => state[key] = value
};
