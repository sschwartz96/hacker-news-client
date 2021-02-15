<script>
  import { category } from '../stores';

  const categories = ['Top', 'New', 'Best'];

  const setCategory = (x) => ($category = x);
</script>

<div class="header">
  <h1>Hacker News Client</h1>
  <div class="menu-container">
    <ul>
      {#each categories as cat}
        <li class:current={$category === cat} on:click={() => setCategory(cat)}>
          {cat}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .header {
    position: relative;
    width: 100%;
    padding: 24px;
    background: rgb(235, 235, 235);
  }
  h1 {
    display: block;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 2em;
  }
  .menu-container {
    margin-top: 14px;
  }
  .menu-container > ul {
    display: flex;
    flex-direction: row;
  }
  .menu-container > ul li {
    display: block;
    cursor: pointer;
    margin-right: 20px;
    padding: 8px;
    width: 40px;
    text-align: center;
    transition: background 100ms;
    transition-timing-function: ease-in;
  }
  .menu-container > ul li:hover,
  .current {
    color: white;
    background: rgba(204, 82, 0, 0.8);
  }
  .current {
    font-weight: bold;
  }
</style>
