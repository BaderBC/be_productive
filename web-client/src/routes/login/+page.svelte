<svelte:head>
  <link rel="stylesheet" href="/index.css">
  <link rel="stylesheet" href="/login_register.css">
  <title>Login</title>
</svelte:head>

<div class="login-form">
  <h1>SIGN IN TO YOUR ACCOUNT</h1>

  <form on:submit|preventDefault={login}>
    <div class="fields">
      <input placeholder="email@example.com" required type="email" name="email" id="email" bind:value={email} />
      <input placeholder="********" required type="password" name="password" id="password" bind:value={password} />
      <button type="submit">Login</button>
    </div>
  </form>
</div>

<script lang="ts">
  import { goto } from '$app/navigation';

  const { VITE_BACKEND_URL } = import.meta.env;

  let email: string = '';
  let password: string = '';

  async function login() {
    const response = await fetch(VITE_BACKEND_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
      credentials: 'include'
    });

    if (response.ok) {
      console.log('redirecting');
      await goto('/');
    }
  }
</script>