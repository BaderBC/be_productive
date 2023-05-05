<script lang="ts">
    import {gql} from "@apollo/client/core";
    import {client} from "../client";
    import type {ActivityType} from "../../graphql/generated";
    import Activity from "$lib/Activity.svelte";
    
    export let progress_type: "percentages" | "units" = "percentages";

    const activities_query = gql`
    query {
        allActivities {
            id
            name
            description
            time_spent_ms
            time_to_spend_weekly
            session_start
            is_active
        }
    }
  `;
    
    let activities: Promise<ActivityType[]> =
        client
            .query({query: activities_query})
            .then(res => res.data);

</script>

{#await activities}
    <p>loading...</p>
{:then data}
    <div class="activities">
    {#each data.allActivities as activity}
            <Activity activity={activity} progress_type={progress_type} />
    {/each}
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}

<style>
    .activities {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5em 1em;
    }
</style>