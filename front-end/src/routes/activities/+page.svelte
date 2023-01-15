<body>
<style>
    body {
        background-color: #141519;
        color: rgba(255, 255, 255, 0.84);
    }
</style>

<h1>Add</h1>
<form id="addForm" onsubmit="return false;" method="POST" on:submit|preventDefault={formSubmit}>
    <input type="text" placeholder="Activity name" id="name" name="name">
    <label for="name">Name of activity you want to add</label>
    <br>
    <input type="text" required placeholder="HH:MM:SS" id="duration" name="duration">
    <label for="duration">How much time weekly you planned to spend</label>
    <br>
    <input type="submit">

</form>
</body>
<script>
    function formSubmit(e) {
        const formData = new FormData(e.target)
        let data = Object.fromEntries(formData.entries());
        console.table(data);
        const {
            duration: durationInput,
            name
        } = data;

        const duration = durationInput.split(':');
        let durationInMs = 0;


        if (duration.includes('')) {
            const errorMessage = 'Wrong date input';
            alert(errorMessage);
            throw new Error(errorMessage);
        }

        //if duration contains other chars than digits and ":"
        if (!/^\d+$/.test(duration.join(''))) {
            const errorMessage = 'You cannot pass duration with chars other than digits';
            alert(errorMessage);
            throw new Error(errorMessage);
        }


        durationInMs += parseInt(duration[0]) * 60 * 60 * 1000;
        if (duration.length > 1) durationInMs += parseInt(duration[1]) * 60 * 1000;
        if (duration.length > 2) durationInMs += parseInt(duration[2]) * 1000;

        console.log(name, durationInMs);
        jsonByPost('http://localhost:3000/activities/add', {
            name,
            duration: durationInMs
        })
            .then(data => data.json())
            .then(data => {
                if (!data.ok) {
                    alert("ERROR: " + data.message);
                    throw new Error(data.message);
                }
                console.log(data);
                window.location.reload();
                2

            });
    }


    function jsonByPost(url, data) {
        console.log(JSON.stringify(data));
        return fetch(url, {
            method: 'POST',
            //mode:'no-cors',
            redirect: 'follow',
            credentials: 'include',
            cache: 'no-cache',
            'Access-Control-Allow-Credentials': true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
</script>