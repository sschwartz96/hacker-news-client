import { writable, derived } from 'svelte/store';
import axios from "axios";

export const category = writable('New', () => {
    console.log('got a subscriber');
});

export const ids = derived(
    category,
    async ($category, set) => set(await getIDs($category)),
    []
);

const API_URL = "https://hacker-news.firebaseio.com/v0";

const getIDs = async (category) => {
    if (!category) return [];
    const res = await axios.get(
        `${API_URL}/${category.toLowerCase()}stories.json`
    );
    const data = await res.data;
    return data;
};