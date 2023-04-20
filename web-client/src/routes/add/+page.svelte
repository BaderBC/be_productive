<link rel="stylesheet" href="add.css">

<div class="main">
  <h1>ADD ACTIVITY</h1>

  <form>
    <input type="text" required placeholder="name" bind:value={activityName}>
    <input type="text" placeholder="description" bind:value={activityDescription}>
    <input type="number" required placeholder="number of hours you want to spend weekly" bind:value={activityTimeWeekly}>

    <button type="submit" on:click={addActivity}>ADD</button>
  </form>
</div>

<script lang="ts">
  import { goto } from '$app/navigation';

  const { VITE_BACKEND_URL } = import.meta.env;

  let activityName = '';
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
        description: activityDescription,
        time_to_spend_weekly: activityTimeWeekly,
      }),
    });
    await goto('/');
  }

</script>