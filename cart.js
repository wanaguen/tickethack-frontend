// Déclaration de la fonction pour générer les résultats de recherche
function displayResults(data) {
    if (data.searchTrips[0] === undefined) {
        document.querySelector('#notickets-msg').style.display = 'block';
    } else {
    
    document.querySelector('#notickets-msg').style.display = 'none';
    // Puis on vient créer autant de lignes qu'il y a de résultats remontés
    for (let i = 0; i < data.length; i++) {
        const hours = new Date(data[i].date).getHours();
        const minutes = new Date(data[i].date).getMinutes();

        document.querySelector('#tripscart').innerHTML += `
        <div class="row">
            <p>${data[i].departure} > ${data[i].arrival} </p>
            <p>${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}</p>
            <p>${data[i].price}€ </p>
            <button id="purchase-button" type="button">Purchase</button>
        </div>
        `
        
    }
    const bookButtons = document.querySelectorAll('#book-button');
    for (let j = 0; j < bookButtons.length; j++) {
        const trip = {
            tripId: data.searchTrips[j]._id,
            departure,
            arrrival,
            date,
            price
        }
        fetch('http://localhost:3000/carts', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(trip)
         })
        
        bookButtons[j].addEventListener('click', function() {
            console.log(`ID du voyage : ${trip.tripId}`);
            // window.location.assign('cart.html');
        })
    }
    } 
}