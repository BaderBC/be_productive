<svelte:head>
  <link rel="stylesheet" href="/index.css">
  <title>Register</title>
</svelte:head>

<div class="login-page">
  <h1>Register</h1>

  <div class="register-form">
    <form on:submit|preventDefault={register}>
      <div class="name">
        <label for="name">Name</label>
        <input required placeholder="name" type="text" name="name" id="name" bind:value={name} />
      </div>
      <div class="surname">
        <label for="surname">Surname</label>
        <input required placeholder="surname" type="text" name="surname" id="surname" bind:value={surname} />
      </div>
      <div class="email">
        <label for="email">Email</label>
        <input required type="email" name="email" id="email" bind:value={email} />
      </div>
      <div class="password">
        <label for="password">Password</label>
        <input required type="password" name="password" id="password" bind:value={password} />
      </div>
      <div class="retype-password">
        <label for="retype-password">Confirm Password</label>
        <input required type="password" name="password" id="retype-password" bind:value={retype_password} />
      </div>
      <div class="submit">
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</div>

<script lang="ts">
  import { goto } from "$app/navigation";
  const { VITE_BACKEND_URL } = import.meta.env;

  let email: string = "";
  let password: string = "";
  let name: string = "";
  let surname: string = "";
  let retype_password: string = "";

  async function register() {
    if (password !== retype_password) {
      alert("Passwords do not match");
      return;
    }
    
    const response = await fetch(VITE_BACKEND_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        name,
        surname,
      }),
      credentials: "include",
    });

    if (response.ok) {
      console.log("redirecting");
      await goto("/");
    }
  }
</script>
