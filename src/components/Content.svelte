<script>
  import axios from 'axios';

  import { category } from '../stores'

  const API_URL = 'https://hacker-news.firebaseio.com/v0';

  const updateIDS = async (category) => {
    if (!category) return []
    // load the content
    console.log('updating ids: ', category);
    const res = await axios.get(`${API_URL}/${category.toLowerCase()}stories.json`)
    const data = await res.data;
    return data;
  }
  let currentIDs = [];
  $: currentIDs = updateIDS($category);
</script>

<div class="content-container">
  {currentIDs}
  <span>Stories: {currentIDs.length}</span>
  <ul>
    {#each currentIDs as id}
      <li>{id}</li>
    {/each}
  </ul>
</div>

<style>
  .content-container {
    width: 100%;
    padding: 24px;
  }
</style>
