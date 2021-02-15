<script>
  import { ids } from "../stores";
</script>

<div class="content-container">
  <span>Stories: {$ids.length}</span>
  <ul>
    {#each $ids.filter((v, i) => i < 25) as id}
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
