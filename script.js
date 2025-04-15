// Déclaration de la fonction pour générer les résultats de recherche
function createTripRow(data) {
    // Avant de créer les nouvelles lignes, on supprime les anciennes
    const lastRows = document.querySelectorAll('.row');

    for (let j = 0; j < lastRows.length; j++) {
        lastRows[j].remove();
    }

    // Puis on vient créer autant de lignes qu'il y a de résultats remontés
    for (let i = 0; i < data.searchTrips.length; i++) {
        const hours = new Date(data.searchTrips[i].date).getHours();
        const minutes = new Date(data.searchTrips[i].date).getMinutes();

        document.querySelector('#trips-container').innerHTML += `
        <div class="row">
            <p>${data.searchTrips[i].departure} > ${data.searchTrips[i].arrival} </p>
            <p>${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}</p>
            <p>${data.searchTrips[i].price}€ </p>
            <button id="book-button" type="button">Book</button>
        </div>
        `
    }
    
}

// On écoute l'événement "clic" du bouton de recherche
document.querySelector('#search-button').addEventListener('click', function() {
    const trip = {
        departure: document.querySelector('#search-departure').value,
        arrival: document.querySelector('#search-arrival').value,
        date: document.querySelector('#search-date').value
    }
    fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(trip)
     })
        .then(response => response.json())
        .then(data => {
            if (!data.searchTrips) {
                
            }
            console.log('Trips trouvés : ' + data);
            createTripRow(data);
        })
})