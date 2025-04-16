
// Déclaration de la fonction pour générer les résultats de recherche
function displayResults(data) {

    // Puis on vient créer autant de lignes qu'il y a de résultats remontés
    for (let i = 0; i < data.length; i++) {
        const hoursDigit = new Date(data[i].date).getHours();
        const minutesDigit = new Date(data[i].date).getMinutes();
        const jours = new Date(data[i].date).getDay() - new Date(moment().format()).getDay();
        const hours = new Date(data[i].date).getHours() - new Date(moment().format()).getHours();
        const minutes = new Date(data[i].date).getMinutes() - new Date(moment().format()).getMinutes();
        const seconds = new Date(data[i].date).getSeconds() - new Date(moment().format()).getSeconds();
        
        document.querySelector('#tripsbooking').innerHTML += `
        <div class="row">
            <p>${data[i].departure} > ${data[i].arrival} </p>
            <p>${String(hoursDigit).padStart(2, '0')}:${String(minutesDigit).padStart(2, '0')}</p>
            <p>${data[i].price}€ </p>
            <div id="countdown">Départ dans ${jours} j ${hours} h ${minutes} m ${seconds} s</div>
        </div>
        `
    }
    
}

// Au chargement de la page, on fetch tous les trajets enregistés dans la collection Cart (grâce à la fonction display Results)
fetch('http://localhost:3000/bookings')
    .then(response => response.json())
    .then(data => {
        console.log(`Tickets trouvés : ${data.allBookings}`);
        // deletePreviousContent();
        setInterval(displayResults(data.allBookings), 1000);
        if (data.allBookings.length === 1) {
            document.querySelector('#nobooking-msg').style.display = 'block';
        } else {
            document.querySelector('#nobooking-msg').style.display = 'none';
        }
    })