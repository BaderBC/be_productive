<script lang="ts">
    import type {ActivityType} from "../../graphql/generated";

    export let activity: ActivityType;
    let time_spent: number;
    let progress: number;
    $: {
        time_spent =
            activity.time_spent_ms
            + Date.now()
            - (new Date(activity.session_start)).getTime();
        
        progress = time_spent / activity.time_to_spend_weekly;
        if (progress > 100) progress = 100;
        
        console.log(time_spent, progress);
    }
</script>

<div class="activity">
    <div class="activity-name">
        <span>{activity.name}</span>
        <div class="activity-progress-bar" style="width: {progress}%"></div>
    </div>
</div>

<style>
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
