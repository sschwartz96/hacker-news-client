<script>
  import { ids } from '../stores';
  import Item from './Item.svelte';
  import Comments from './Comments.svelte';
  import { getItems } from '../api';

  let lastIndex = 15;
  let cIDs = undefined;

  const handleComments = (event) => {
    console.log('event:', event);
    cIDs = event.detail;
  };

  const onBack = () => {
    cIDs = undefined;
  };

  $: showItems = async () => {
    const curIDs = $ids;
    if (curIDs === 'error') throw new Error('showItems() error');
    const shownIDs = curIDs.filter((_, i) => i < lastIndex);
    return getItems(shownIDs);
  };
</script>

<div class="content-container">
  {#if cIDs}
    <button on:click={onBack}>Back</button>
    <Comments {cIDs} />
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
