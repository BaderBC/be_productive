<h1>Hi {email}</h1>

<script lang="ts">
  import { getUser } from '../lib/getUser';
  import { onMount } from 'svelte';
  
  let email: string = 'loading...';
  
  onMount(() => {
    email = getUser()?.email || 'no email';
  });
  
</script>