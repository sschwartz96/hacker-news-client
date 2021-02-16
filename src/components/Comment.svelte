<script>
  import Comments from './Comments.svelte';

  export let data;
</script>

<div class="comment-wrapper">
  <p>{@html data.text}</p>
  <div class="thread-wrapper">
    <Comments cIDs={data.kids} />
  </div>
</div>

<style>
  .comment-wrapper {
    margin-left: 18px;
    margin-bottom: 28px;
  }
  .thread-wrapper {
    margin-top: 6px;
  }
</style>
