document.getElementById('getInfoButton').addEventListener('click', getSuperheroInfoAndPowers);

function getSuperheroInfoAndPowers() {
    const superheroId = document.getElementById('superheroId').value;

    Promise.all([
        fetch(`/superhero/${superheroId}`).then(response => response.json()), //fetch hero info
        fetch(`/superhero/${superheroId}/powers`).then(response => response.json()) //fetch corresponding hero powers
    ])
    .then(data => {
        const [info, powers] = data;

        const heroInfo = document.getElementById('superheroInfo');
        const heroPowers = document.getElementById('superheroPowers');

        //hero info
        if (info.message) {
            heroInfo.textContent = info.message;
        } else {
            heroInfo.textContent = JSON.stringify(info, null, 2);
        }

        //hero powers
        if (powers.message) {
            heroPowers.textContent = powers.message;
        } else {
            heroPowers.textContent = JSON.stringify(powers, null, 2);
        }
    })
    .catch(error => {
        console.error('error: ', error);
    });
}

// Function to get all available publisher names
function getPublisherNames() {
    fetch('/publishers')
        .then(response => response.json())
        .then(data => {
            const publisherInfo = document.getElementById('publisherInfo');
            publisherInfo.innerHTML = '<h2>Publisher Names:</h2>';
            data.publishers.forEach(publisher => {
                publisherInfo.innerHTML += `<p>${publisher}</p>`;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Hook up the button to get publisher names
document.getElementById('getPublisherButton').addEventListener('click', getPublisherNames);

