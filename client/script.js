//document.getElementById('getInfoButton').addEventListener('click', getSuperheroInfoAndPowers);
document.getElementById('searchButton').addEventListener('click', searchSuperheroes);

// function getSuperheroInfoAndPowers() {
//     const superheroName = document.getElementById('superheroId').value;

//     fetch(`/superhero/?name=${superheroName}`)
//         .then(response => response.json())
//         .then(data => {
//             const heroInfo = document.getElementById('superheroInfo');
//             if (data.message) {
//                 heroInfo.textContent = data.message;
//             } else {
//                 heroInfo.innerHTML = `<h2>${data.name}</h2>`;
//                 for (const [key, value] of Object.entries(data)) {
//                     if (key !== 'id' && key !=='name') { //fields i dont want to be displayed for the hero info
//                         heroInfo.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
//                     }
//                 }

//                 //fetch superhero powers
//                 fetch(`/superhero/${data.id}/powers`)
//                     .then(response => response.json())
//                     .then(powersData => {
//                         const heroPowers = document.getElementById('superheroPowers');
//                         if (powersData.message) {
//                             heroPowers.textContent = powersData.message;
//                         } else {
//                             heroPowers.innerHTML = '<h3>Powers:</h3>';
//                             for (const [key, value] of Object.entries(powersData)) {
//                                 if (value === 'True') {//dont want it to type true next to the powers they have
//                                     heroPowers.innerHTML += `<p>${key}</p>`;
//                                 }
//                             }
//                         }
//                     })
//                     .catch(error => {
//                         console.error('Error fetching superhero powers:', error);
//                     });
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching superhero information:', error);
//         });
// }

function searchSuperheroes() {
    const publisher = document.getElementById('publisher').value;
    const pattern = document.getElementById('pattern').value;
    const limit = document.getElementById('limit').value;
    const race = document.getElementById('race').value;
    const power = document.getElementById('power').value;

    const queryParams = new URLSearchParams({
        publisher,
        name: pattern,
        n: limit,
        race,
        power
    });

    fetch(`/superhero/search?${queryParams}`)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = '<h2>Matching Superheroes:</h2>';

            if (data.message) {
                searchResults.textContent = data.message;
            } else {
                data.matchingSuperheroes.forEach(hero => {
                    const superheroContainer = document.createElement('div');
                    superheroContainer.classList.add('superhero-container');

                    const superheroInfo = document.createElement('div');
                    superheroInfo.classList.add('superhero-info');
                    superheroInfo.innerHTML = `
                        <h3>${hero.name}</h3>
                        ${Object.entries(hero)
                            .filter(([key]) => key !== 'id' && key !== 'name')//dont show these fields
                            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
                            .join('')}
                    `;
                    superheroContainer.appendChild(superheroInfo);

                    searchResults.appendChild(superheroContainer); //append the hero info before fetching powers

                    fetch(`/superhero/${hero.id}/powers`)
                        .then(response => response.json())
                        .then(powersData => {
                            const superheroPowers = document.createElement('div');
                            superheroPowers.classList.add('superhero-powers');
                            superheroPowers.innerHTML = '<h3>Powers:</h3>';
                            
                            if (powersData.message) {
                                superheroPowers.textContent = powersData.message;
                            } else {
                                Object.entries(powersData).forEach(([key, value]) => {
                                    if (value === 'True') {
                                        superheroPowers.innerHTML += `<p>${key}</p>`;
                                    }
                                });
                            }
                            
                            superheroContainer.appendChild(superheroPowers); //append powers after fetching them
                        })
                        .catch(error => {
                            console.error('Error fetching superhero powers:', error);
                        });
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

//fetch the publisher names
function populatePublisherDropdown() {
    fetch('/publishers')
        .then(response => response.json())
        .then(data => {
            data.publishers.sort();

            const publisherDropdown = document.getElementById('publisher');
            const allOption = document.createElement('option');//add an All option
            allOption.value = 'All';
            allOption.textContent = 'All';
            publisherDropdown.appendChild(allOption);

            data.publishers.forEach(publisher => {
                if (publisher.trim() !== '') { //if the publisher is not blank
                    const option = document.createElement('option');
                    option.value = publisher;
                    option.textContent = publisher;
                    publisherDropdown.appendChild(option);
                }
            });
        })
        .catch(error => console.error('Error:', error));
}
populatePublisherDropdown();//call it to populate the dropdown menu



