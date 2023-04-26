<script lang="ts">
  import { gql } from "@apollo/client/core";
  import { client } from "../../client";

  const activities_query = gql`
    query {
        allActivities {
            name
            description
        }
    }
  `;
  
  const activities = 
    client
      .query({ query: activities_query })
      .then(res => res.data);
  
  activities.then(console.log);
  
</script>

{#await activities}
  <p>loading...</p>
{:then data}
  <ul>
    {#each data.allActivities as activity}
      <li>
        <h3>{activity.name}</h3>
        <p>{activity.description}</p>
      </li>
    {/each}
  </ul>
{:catch error}
  <p>{error.message}</p>
{/await}