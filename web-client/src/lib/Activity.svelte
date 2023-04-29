<script lang="ts">
    import {gql} from "@apollo/client/core";
    import {client} from "../client";
    import type {ActivityType} from "../../graphql/generated";

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
        <div class="activity">
            <div class="activity-name">
                <span>{activity.name}</span>
                <div class="activity-progress-bar" style="width: 20%"></div>
            </div>
        </div>
    {/each}
{:catch error}
    <p>{error.message}</p>
{/await}

<style>
    span {
        color: #4a41b9;
    }

    .activity {
        background-color: #e5e8ed;
        width: 100%;
        margin: 0.5em;
        padding: 1em;
        box-sizing: border-box;
    }

    .activity-name {
        background-color: #2b2b2e65;
        width: 40%;
        overflow: hidden;
    }

    .activity-progress-bar {
        height: 100%;
        width: 0;
        background-color: rgb(55, 193, 55);
    }

    .activity-name > span {
        font-size: 25px;
        position: absolute;
        color: #e5e8ed;
        top: 50%;
        left: 10px;
        transform: translate(0, -50%);
    }

    .activity-name {
        height: 3em;
        position: relative;
        border-radius: 4px;
    }
</style>