import { writable, derived } from 'svelte/store';
import axios from 'axios';

export const category = writable('Top', () => {
  console.log('got a subscriber');
});

export const ids = derived(
  category,
  async ($category, set) => {
    set([]); // set empty while loading ids
    const data = await getIDs($category);
    set(data);
  },
  []
);

const API_URL = 'https://hacker-news.firebaseio.com/v0';

const getIDs = async (category) => {
  if (!category) return [];
  const data = await axios
    .get(`${API_URL}/${category.toLowerCase()}stories.json`)
    .then((resp) => resp.data)
    .catch(() => 'error');
  return data;
};
