import { createStore } from '@stencil/store';
import { get, set } from './storage';

// @TODO: optimize
const shouldUpdate = () => true;

const { state, on } = createStore({
    items: []
}, shouldUpdate);

(async () => {
    state.items = (await get('items')) || [];
})();

// update local storage whenever a value changes
on('set', (key, newValue) => {
    set(key, newValue);
});

export const store = {
    get: (key: string) => state[key],
    set: (key: string, value: any) => state[key] = value
};
