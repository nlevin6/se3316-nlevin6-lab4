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
