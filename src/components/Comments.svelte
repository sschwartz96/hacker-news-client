<script>
  import { onMount } from 'svelte';
  import Comment from './Comment.svelte';
  import { getItems } from '../api';

  let comments = [];
  export let cIDs;

  onMount(async () => {
    comments = await getItems(cIDs);
  });
</script>

{#each comments as data}
  <Comment {data} />
{/each}

<style>
</style>
