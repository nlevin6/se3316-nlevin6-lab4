document.getElementById('getInfoButton').addEventListener('click', getSuperheroInfoAndPowers);
//document.getElementById('createNewList').addEventListener('click', createNewList);
//document.getElementById('saveList').addEventListener('click', saveList);
document.getElementById('searchButton').addEventListener('click', searchSuperheroes);

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
}
//fetch the publisher names
function populatePublisherDropdown() {
    fetch('/publishers') // Fetch the publisher names from the backend
        .then(response => response.json())
        .then(data => {
            const publisherDropdown = document.getElementById('publisher');
            data.publishers.sort(); //sort this bad boy
            data.publishers.forEach(publisher => {
                const option = document.createElement('option');
                option.value = publisher;
                option.textContent = publisher;
                publisherDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}


document.getElementById('searchButton').addEventListener('click', searchSuperheroes);
populatePublisherDropdown();


function searchSuperheroes() {
    const field = document.getElementById('publisher').value;
    const pattern = document.getElementById('pattern').value;
    const n = document.getElementById('limit').value;
    const race = document.getElementById('race').value;
    const power = document.getElementById('power').value;

    const queryParams = new URLSearchParams({
        field,
        pattern,
        n,
        race,
        power
    });

    fetch(`/superhero/search?${queryParams}`)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = '<h2>Matching Superheroes:</h2>';
            data.matchingSuperheroes.forEach(hero => {
                searchResults.innerHTML += `<p>${hero.name}</p>`;
            });
        })
        .catch(error => console.error('Error:', error));
}


// function createNewList() {
//     const listName = document.getElementById('listName').value; // Input for new list name
//     const heroIDs = document.getElementById('heroIDs').value.split(','); // Input for superhero IDs

//     fetch('/superhero/list', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ listName, heroIDs })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.message); // Log the response message
//     })
//     .catch(error => console.error('Error:', error));
// }

// function saveList() {
//     const listName = document.getElementById('listNameToUpdate').value; // Input for list name
//     const heroIDs = document.getElementById('updatedHeroIDs').value.split(','); // Input for updated superhero IDs

//     fetch(`/superhero/list/${listName}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ heroIDs })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.message); // Log the response message
//     })
//     .catch(error => console.error('Error:', error));
// }


