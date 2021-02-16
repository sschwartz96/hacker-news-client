import axios from 'axios';

const API_URL = 'https://hacker-news.firebaseio.com/v0';

export const getItems = async (itemIDs) => {
  if (!itemIDs) return [];
  const items = [];

  await Promise.all(
    itemIDs.map(async (id, i) => {
      items[i] = await getItem(id);
    })
  );
  return items;
};

const getItem = async (id) => {
  const data = axios
    .get(`${API_URL}/item/${id}.json`)
    .then((resp) => resp.data)
    .catch(() => new Error('getItem() error'));
  return data;
};
