<link rel="stylesheet" href="/home.css">

{#if user}
  
  <div class="main">
    <div class="add-activity">
      <input type="text" placeholder="Activity name">
      <a href="/add">+</a>
    </div>
    <Activity />
  </div>

{:else}

  <div class="no-logged">
    <div class="about">
      <h1>Welcome to be_productive!</h1>
      <span>be_productive is a productivity app that helps you keep track of your tasks and projects.</span>
      <span>Real difference between this and other apps is that this will help you to create flexible graphic.</span>
      <span>
        While most of apps are built to provide static plan of day
        this one allows you to set how much time you want to spend weekly on activity and helps you to monitor your
        progress.
      </span>
    </div>

    <div class="login-register">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>

  </div>
{/if}


<script lang="ts">
  import { getUser } from '../lib/getUser';
  import type { UserPublicInfo } from '../lib/getUser';
  import Activity from '../lib/Activity/Activity.svelte';

  let user: UserPublicInfo | null = null;

  user = getUser() || null;

</script>