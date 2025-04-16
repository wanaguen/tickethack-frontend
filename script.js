// Déclaration de la fonction pour générer les résultats de recherche
function displayResults(data) {
    if (data.searchTrips[0] === undefined) {

        // document.querySelector('#image-train').style.display = 'none';
        document.querySelector('#image-train').src = "images/notfound.png";
        document.querySelector('#phrase-train').textContent = "No trip found.";
        document.querySelector('#image-train').style.display = 'block';
        document.querySelector('#phrase-train').style.display = 'block';;
        // document.querySelector('#trips-container').innerHTML += `
        // <img id="image-train" src="images/notfound.png"/>
        // <h2 id="phrase-train">No trip found.</h2>
        // `
    } else {

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

    const bookButtons = document.querySelectorAll('#book-button');
    for (let j = 0; j < bookButtons.length; j++) {
        const trip = {
            tripId: data.searchTrips[j]._id,
            departure : data.searchTrips[j].departure,
            arrival: data.searchTrips[j].arrival,
            date: data.searchTrips[j].date,
            price: data.searchTrips[j].price,
        }
        
        bookButtons[j].addEventListener('click', function() {
            fetch('http://localhost:3000/carts', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(trip)
             })
            console.log(`ID du voyage : ${trip.tripId}`);
            window.location.assign('cart.html');
        })
    }
    } 
}

// On déclare la fonction qui va d'abord supprimer le contenu affiché avant les résultats de la recherche
function deletePreviousContent() {
    const image = document.querySelector('#image-train');
    const texte = document.querySelector('#phrase-train');
    const lastRows = document.querySelectorAll('.row');

        image.style.display = 'none';
        texte.style.display = 'none';
        for (let j = 0; j < lastRows.length; j++) {
            lastRows[j].remove();
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
            console.log('Trips trouvés : ' + data);
            deletePreviousContent();
            displayResults(data);
        })
})