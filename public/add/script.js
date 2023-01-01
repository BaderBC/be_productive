const addForm = document.getElementById('addForm');
const nameInput = document.getElementById('name');
const durationInput = document.getElementById('duration');


addForm.addEventListener('submit', () => {
    const duration = durationInput.value.split(':');
    const name = nameInput.value;
    let durationInMs = 0;


    if(duration.includes('')) {
        const errorMessage = 'Wrong date input';
        alert(errorMessage);
        throw new Error(errorMessage);
    }

    //if duration contains other chars than digits and ":"
    if(!/^\d+$/.test(duration.join(''))) {
        const errorMessage = 'You cannot pass duration with chars other than digits';
        alert(errorMessage);
        throw new Error(errorMessage);
    }


    durationInMs += parseInt(duration[0]) * 60 * 60 * 1000;
    if(duration.length > 1) durationInMs += parseInt(duration[1]) * 60 * 1000;
    if(duration.length > 2) durationInMs += parseInt(duration[2]) * 1000;


    jsonByPost('/add', {
        name,
        duration: durationInMs
    })
        .then(data => data.json())
        .then(data => {
            console.log(data);
            if (!data.ok) alert("ERROR: " + data.message);
        });
});




function jsonByPost(url, data) {
    return fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}