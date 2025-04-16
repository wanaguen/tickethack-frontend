function travelTime(infos) {
    let result = '';
    const time = new Date(infos.arrival) - new Date(infos.departure);

        result = `Temps de trajet estimé : ${time / 60000} minutes`;

}

// Déclaration de la fonction pour générer les résultats de recherche
function displayResults(data) {

    let totalCount = 0;

    // Puis on vient créer autant de lignes qu'il y a de résultats remontés
    for (let i = 0; i < data.length; i++) {
        const hours = new Date(data[i].date).getHours();
        const minutes = new Date(data[i].date).getMinutes();
        
        document.querySelector('#tripsbooking').innerHTML += `
        <div class="row">
            <p>${data[i].departure} > ${data[i].arrival} </p>
            <p>${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}</p>
            <p>${data[i].price}€ </p>
            <p>Départ dans : ${travelTime(data[i])}€ </p>
        </div>
        `
    }
}

// Au chargement de la page, on fetch tous les trajets enregistés dans la collection Cart (grâce à la fonction display Results)
fetch('http://localhost:3000/bookings')
    .then(response => response.json())
    .then(data => {
        console.log(`Tickets trouvés : ${data.allCarts}`);
        // deletePreviousContent();
        displayResults(data.allBookings);
        if (data.allCarts.length === 0) {
            document.querySelector('#nobooking-msg').style.display = 'block';
        } else {
            document.querySelector('#nobooking-msg').style.display = 'none';
        }
    })