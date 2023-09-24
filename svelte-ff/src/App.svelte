<script lang="ts">
  import { onMount } from "svelte";
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import { initAuth, login, logout, isAuthenticated } from "./lib/auth";
  import ProductService, {productData, type IProduct} from "./service/products.service";

  let product: IProduct = null;
  $: loggedIn = false;
   // Subscribe to changes in the productData store
  $: {
    $productData = $productData;
    product = $productData;
  }

  onMount(async () => {
    console.log("Initializing authentication");
    loggedIn = await initAuth();
    console.log("Authentication", loggedIn);
    console.log("Fetching products");
    new ProductService();
   
  });
</script>

<main>
  {#if loggedIn === true}
    <p>User is successfully logged in</p>
    <button
      on:click={() => {
        logout();
      }}>Logout</button
    >
  {/if}

  {#if loggedIn === false}
    <p>You are not logged in currently</p>
    <button
      on:click={() => {
        login();
      }}>Login</button
    >
  {/if}
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
