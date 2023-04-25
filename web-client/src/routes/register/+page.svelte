<svelte:head>
  <link rel="stylesheet" href="/index.css">
  <link rel="stylesheet" href="/login_register.css">
  <title>Register</title>
</svelte:head>

<div class="login-form">
  <h1>REGISTER</h1>

  <form on:submit|preventDefault={register}>
    <div class="fields">
      <input required placeholder="name" type="text" name="name" id="name" bind:value={name} />
      <input required placeholder="surname" type="text" name="surname" id="surname" bind:value={surname} />
      <input required placeholder="email@example.com" type="email" name="email" id="email" bind:value={email} />
      <input required placeholder="********" type="password" name="password" id="password" bind:value={password} />
      <input required placeholder="********" type="password" name="password" id="retype-password" bind:value={retype_password} />
      <button type="submit">Register</button>
    </div>
  </form>
</div>

<script lang="ts">
  import { goto } from '$app/navigation';

  const { VITE_BACKEND_URL } = import.meta.env;

  let email: string = '';
  let password: string = '';
  let name: string = '';
  let surname: string = '';
  let retype_password: string = '';

  async function register() {
    if (password !== retype_password) {
      alert('Passwords do not match');
      return;
    }

    const response = await fetch(VITE_BACKEND_URL + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        name,
        surname,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
      credentials: 'include'
    });

    if (response.ok) {
      console.log('redirecting');
      await goto('/');
    }
  }
</script>
