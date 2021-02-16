<script>
  import { ids } from "../stores";
  import Item from "./Item.svelte";
  import axios from "axios";

  const API_URL = "https://hacker-news.firebaseio.com/v0";
  let lastIndex = 15;

  const getItems = async (itemIDs) => {
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
    const data = await axios
      .get(`${API_URL}/item/${id}.json`)
      .then((resp) => resp.data)
      .catch(() => "error");
    return data;
  };

  $: showItems = async () => {
    const curIDs = $ids;
    if (curIDs === "error") throw new Error("showItems() error");
    const shownIDs = curIDs.filter((_, i) => i < lastIndex);
    return getItems(shownIDs);
  };
</script>

<div class="content-container">
  <ul>
    {#if $ids}
      {#await showItems()}
        <span>Loading...</span>
      {:then items}
        {#each items as item}
          <Item {item} />
        {/each}
      {:catch error}
        <span style="color: red">Network Error. Please try again. {error}</span>
      {/await}
    {/if}
  </ul>
</div>

<style>
  .content-container {
    width: 100%;
    padding: 24px;
  }
</style>
