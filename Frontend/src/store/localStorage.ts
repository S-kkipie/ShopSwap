import { RootState } from "./store";

export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("cartState", serializedState);
    } catch (e) {
        console.warn("Could not save state", e);
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("cartState");
        if (serializedState === null) {
            return undefined;
        }
        return { cart: JSON.parse(serializedState) };
    } catch (e) {
        console.warn("Could not load state", e);
        return undefined;
    }
};
