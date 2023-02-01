<script>
    let activities = [];

    fetch('http://localhost:3000/activities/list', {
        method: 'GET',
        redirect: 'follow',
        credentials: 'include',
        cache: 'no-cache'
    })
        .then(res => res.json())
        .then(res => {
            console.log('then: ', res);
            console.log(res[0].session_start);
            activities = res;
        })
        .catch(err => {
            console.error(err);
            //window.location.assign('/auth');
        });

    function msIntoDuration(millis) {
        const dur = {};
        const units = [
            {label: "millis",    mod:1000},
            {label: "seconds",   mod:60},
            {label: "minutes",   mod:60},
            {label: "hours",     mod:24},
            {label: "days",      mod:31}
        ];
        // calculate the individual unit values...
        units.forEach(function(u){
            millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
        });
        // convert object to a string representation...
        const nonZero = u => dur[u.label];

        dur.__proto__.toString = function() {
            return units
                .reverse()
                .filter(nonZero)
                .map(function(u){
                    return dur[u.label] + " " + (dur[u.label]===1?u.label.slice(0,-1):u.label);
                })
                .join(', ');
        };
        console.log('dur', dur.toString());
        return dur.toString();
    }
    function startDoingActivity(activityName) {
        console.log(activityName);
        fetch('http://localhost:3000/activities/start', {
            method: 'PUT',
            redirect: 'follow',
            credentials: 'include',
            cache: 'no-cache',
            'Access-Control-Allow-Credentials': true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: activityName })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }

</script>
<main>
    <style>
        body {
            background-color: #141519;
            color: rgba(255, 255, 255, 0.84);
        }
    </style>

    <a href="/activities">Manage Activities</a> <br>
    <a href="/auth">Login / Register</a><br>

    {#each activities as activity}
        <div style="border: solid aqua; text-align: center">
            <p style="color: #13f091;">{JSON.stringify(activity)}</p>
            <p>Activity name: {activity.name}</p>
            <p>Description: {activities.description || "There's no description"}</p>
            <p>Time to spend weekly: {msIntoDuration(activity.time_weekly)}</p>
            <p>Time already spent: {msIntoDuration(activity.time_sspent) || "none"}</p>

            {#if activity.session_start === null}
                <button on:click={() => startDoingActivity(activity.name)}>Start doing this activity</button>
            {:else}
                <button on:click={() => {console.log(activity)}}>Stop doing this activity</button>
            {/if}
        </div>
    {/each}
</main>