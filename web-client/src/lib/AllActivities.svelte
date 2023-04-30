<script lang="ts">
    import {gql} from "@apollo/client/core";
    import {client} from "../client";
    import type {ActivityType} from "../../graphql/generated";
    import Activity from "$lib/Activity.svelte";

    const activities_query = gql`
    query {
        allActivities {
            name
            description
            time_spent_ms
            time_to_spend_weekly
            session_start
        }
    }
  `;
    
    /*
    interface ActivityWithStats extends ActivityType {
        progress: number;
        time_spent: number;
    }
    */

    let activities: Promise<ActivityType[]> =
        client
            .query({query: activities_query})
            .then(res => res.data);
/*
    $: {
        activities = activities
            .then(a =>
                a.map((data: ActivityWithStats) => {
                    data.time_spent =
                        data.time_spent_ms
                        + Date.now()
                        - (new Date(data.session_start)).getTime();
                    data.progress = time_spent / data.time_to_spend_weekly;
                    return progress;
                })
            )
        ;
    }
 */

</script>

{#await activities}
    <p>loading...</p>
{:then data}
    {#each data.allActivities as activity}
        <Activity activity={activity} />
    {/each}
{:catch error}
    <p>{error.message}</p>
{/await}
