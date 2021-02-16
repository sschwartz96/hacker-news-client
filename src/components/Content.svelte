<script>
  import { ids } from '../stores';
  import Item from './Item.svelte';
  import Comments from './Comments.svelte';
  import { getItems } from '../api';

  let lastIndex = 15;
  let commentIDs = undefined;

  const handleComments = (event) => {
    commentIDs = event.detail;
  };
  const onBack = () => {
    commentIDs = undefined;
  };

  $: showItems = async () => {
    const curIDs = $ids;
    if (curIDs === 'error') throw new Error('showItems() error');
    const shownIDs = curIDs.filter((_, i) => i < lastIndex);
    return getItems(shownIDs);
  };
</script>

<div class="content-container">
  {#if commentIDs}
    <button on:click={onBack}>Back</button>
    <Comments cIDs={commentIDs} />
  {:else}
    <ul>
      {#if $ids}
        {#await showItems()}
          <span>Loading...</span>
        {:then items}
          {#each items as item}
            <Item {item} on:comment={handleComments} />
          {/each}
        {:catch error}
          <span style="color: red"
            >Network Error. Please try again. {error}</span
          >
        {/await}
      {/if}
    </ul>
  {/if}
</div>

<style>
  .content-container {
    width: 100%;
    padding: 24px;
  }
</style>
