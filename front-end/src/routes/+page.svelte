<script defer>
    let activities = [];

    fetch('http://localhost:3000/activities/list', {
        method: 'GET',
        redirect: 'follow',
        credentials: 'include',
        cache: 'no-cache'
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            activities = res;
        })
        .catch(err => {
            console.error(err);
            //window.location.assign('/auth');
        });
</script>

<a href="/activities">Manage Activities</a> <br>
<a href="auth">Login / Register</a><br>

{#each activities as activity}
    <div style="border: solid aqua">
        <p>{activity.name}</p>
    </div>
{/each}