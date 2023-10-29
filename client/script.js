function getSuperheroInfo() {
    const superheroId = document.getElementById('superheroId').value;

    fetch(`/superhero/${superheroId}`)
        .then(response => response.json())
        .then(data => {
            const superheroInfo = document.getElementById('superheroInfo');

            if (data.message) {
                superheroInfo.textContent = data.message;
            } else {
                superheroInfo.textContent = JSON.stringify(data, null, 2);
            }
        })
        .catch(error => console.error('Error:', error));
}
