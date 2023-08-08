<link rel="stylesheet" href="add.css">

<div class="main">
  <h1>ADD ACTIVITY</h1>

  <form on:submit|preventDefault={addActivity}>
    <input type="text" required placeholder="name" bind:value={activityName}>
    <input type="text" placeholder="description" bind:value={activityDescription}>
    <input type="number" required placeholder="number of hours you want to spend weekly" bind:value={activityTimeWeekly}>

    <button type="submit">ADD</button>
  </form>
</div>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from "$app/stores";
  
  const { VITE_BACKEND_URL } = import.meta.env;
  
  let activityName = $page.url.searchParams.get('name');
  let activityDescription = '';
  let activityTimeWeekly = 0;

  async function addActivity() {
    await fetch(`${VITE_BACKEND_URL}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: activityName,
        description: activityDescription || null,
        time_to_spend_weekly: activityTimeWeekly * 1000 * 3600,
      }),
    });
    await goto('/', { invalidateAll: true });
  }

</script>