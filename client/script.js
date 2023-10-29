document.getElementById('getInfoButton').addEventListener('click', getSuperheroInfoAndPowers);

function getSuperheroInfoAndPowers() {
    const superheroName = document.getElementById('superheroId').value;

    fetch(`/superhero/?name=${superheroName}`)
        .then(response => response.json())
        .then(data => {
            const heroInfo = document.getElementById('superheroInfo');
            if (data.message) {
                heroInfo.textContent = data.message;
            } else {
                heroInfo.innerHTML = `<h2>${data.name}</h2>`;
                for (const [key, value] of Object.entries(data)) {
                    if (key !== 'id' && key !=='name') { //fields i dont want to be displayed for the hero info
                        heroInfo.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
                    }
                }

                //fetch superhero powers
                fetch(`/superhero/${data.id}/powers`)
                    .then(response => response.json())
                    .then(powersData => {
                        const heroPowers = document.getElementById('superheroPowers');
                        if (powersData.message) {
                            heroPowers.textContent = powersData.message;
                        } else {
                            heroPowers.innerHTML = '<h3>Powers:</h3>';
                            for (const [key, value] of Object.entries(powersData)) {
                                if (value === 'True') {//dont want it to type true next to the powers they have
                                    heroPowers.innerHTML += `<p>${key}</p>`;
                                }
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching superhero powers:', error);
                    });
            }
        })
        .catch(error => {
            console.error('Error fetching superhero information:', error);
        });

    //fetch publisher names (idk why yet, but my prof wants me to)
    fetch('/publishers')
        .then(response => response.json())
        .then(data => {
            const publisherInfo = document.getElementById('publisherInfo');
            publisherInfo.innerHTML = '<h2>Publisher Names:</h2>';
            data.publishers.forEach(publisher => {
                publisherInfo.innerHTML += `<p>${publisher}</p>`;
            });
        })
        .catch(error => {
            console.error('Error fetching publishers:', error);
        });
}
