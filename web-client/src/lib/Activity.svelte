<script lang="ts">
    import type {ActivityType} from "../../graphql/generated";

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    export let activity: ActivityType;
    export let progress_type: "percentages" | "units" = "percentages";
    // variables bellow are destructured because they need to be writeable, but activity is read-only
    let {is_active, time_spent_ms, session_start} = activity;

    let time_spent: number = time_spent_ms;
    let progress = 0;

    const refreshProgressBar = () => {
        if (is_active)
            time_spent =
                time_spent_ms
                + Date.now()
                - (new Date(session_start)).getTime();

        progress = time_spent / activity.time_to_spend_weekly * 100;
        if (progress > 100) progress = 100;
    };
    refreshProgressBar();
    setInterval(refreshProgressBar, 15);

    async function startActivity() {
        await fetch(BACKEND_URL + "/activities/start", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({activityId: +activity.id}),
        });
        session_start = new Date().toISOString();
        is_active = true;
    }

    async function stopActivity() {
        await fetch(BACKEND_URL + "/activities/stop", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({activityId: +activity.id}),
        });
        refreshProgressBar();
        is_active = false;
        time_spent_ms = time_spent;
    }

    function msIntoTime(time_ms: number) {
        const hours = Math.floor(time_ms / 1000 / 60 / 60);
        const minutes = Math.floor(time_ms / 1000 / 60) % 60;
        const seconds = Math.floor(time_ms / 1000) % 60;
        let time = "";
        
        if (hours) {
            time += `${hours}h `;
        }
        if ((hours && minutes) || (hours && seconds)) {
            time += `${minutes}m `;
        }
        if (seconds) {
            time += `${seconds}s`;
        }
        
        time = time.trim();
        if (!time) {
            time = "0s";
        }

        return time;
    }
</script>

<div class="activity">
    <div class="activity-name">
        <span>{activity.name}</span>
        <div class="activity-progress-bar" style="width: {progress}%"></div>
    </div>
    <div class="right_side">
        <div class="timer">
            {#if progress_type === "percentages"}
                <span>{progress.toFixed(2)}%</span>
            {:else}
                <span>{msIntoTime(time_spent)}</span>
                <hr>
                <span>{msIntoTime(activity.time_to_spend_weekly)}</span>
            {/if}
        </div>
        <div class="start_stop">
            {#if is_active}
                <button class="stop_activity" on:click={stopActivity}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-stop-fill" viewBox="0 0 16 16">
                        <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                    </svg>
                </button>
            {:else}
                <button class="start_activity" on:click={startActivity}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                </button>
            {/if}
        </div>
    </div>
</div>

<style>
    .activity {
        background-color: #f0f0f0;
        width: 100%;
        margin: 0.5em;
        padding: 1em;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 5px;
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

    .right_side {
        display: flex;
        color: #2b2b2e;
    }

    .start_stop {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .start_stop > button {
        display: flex;
        border: none;
        padding: 0;
        background-color: transparent;
        justify-content: center;
    }

    .start_activity {
        color: rgb(55, 193, 55);
    }

    .start_activity:hover {
        color: rgb(41, 132, 41);
    }

    .stop_activity {
        color: rgb(229, 91, 91);
    }

    .stop_activity:hover {
        color: rgb(193, 55, 55);
    }

    .start_stop > button > svg {
        width: 3em;
        height: 3em;
    }
    
    .timer {
        text-align: center;
        width: 6em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .timer > hr {
        width: 100%;
    }
</style>
