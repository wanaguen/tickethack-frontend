// Déclaration de la fonction pour générer les résultats de recherche
function displayResults(data) {

    let totalCount = 0;

    // Puis on vient créer autant de lignes qu'il y a de résultats remontés
    for (let i = 0; i < data.length; i++) {
        const hours = new Date(data[i].date).getHours();
        const minutes = new Date(data[i].date).getMinutes();
        
        document.querySelector('#tripscart').innerHTML += `
        <div class="row">
            <p>${data[i].departure} > ${data[i].arrival} </p>
            <p>${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}</p>
            <p>${data[i].price}€ </p>
            <button id="delete-button" type="button">X</button>
        </div>
        `
        totalCount += data[i].price;
    }

    // Mettre à jour le compteur du montant total du panier
    document.querySelector('#totalCount').textContent = `${totalCount} €`;
    const deleteButtons = document.querySelectorAll('#delete-button');
    for (let j = 0; j < deleteButtons.length; j++) {
        const elementID = data[j]._id
        deleteButtons[j].addEventListener('click', function() {
            fetch('http://localhost:3000/carts', {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: elementID
                })
             }).then(response => response.json())
               .then(() => {
                console.log(`Element supprimé du panier : ${elementID}`)
                deleteButtons[j].parentNode.remove();
                console.log(deleteButtons[j].price);
                totalCount -= data[j].price;
                document.querySelector('#totalCount').textContent = `${totalCount} €`;
               })
               .then(() => {
                console.log('nombre de tickets dans le panier : ' + deleteButtons.length);
                if (deleteButtons.length === 1) {
                    document.querySelector('#notickets-msg').style.display = 'block';
                } else {
                    document.querySelector('#notickets-msg').style.display = 'none';
                }
               })
            
        })   
    }
}

document.querySelector('#purchase-button').addEventListener('click', function() {
    fetch('http://localhost:3000/carts')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.allCarts.length);
            for (let k = 0; k < data.allCarts.length; k++) {
                console.log(data.allCarts[k].departure);
                const trip = { 
                    departure: data.allCarts[k].departure,
                    arrival: data.allCarts[k].arrival,
                    date: data.allCarts[k].date,
                    price: data.allCarts[k].price
                };
                fetch('http://localhost:3000/bookings', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(trip)
                 })
            }
        }).then(() => {
                window.location.assign('booking.html');
            })

})


// Au chargement de la page, on fetch tous les trajets enregistés dans la collection Cart (grâce à la fonction display Results)
fetch('http://localhost:3000/carts')
    .then(response => response.json())
    .then(data => {
        console.log(`Tickets trouvés : ${data.allCarts}`);
        // deletePreviousContent();
        displayResults(data.allCarts);
        if (data.allCarts.length === 0) {
            document.querySelector('#notickets-msg').style.display = 'block';
        } else {
            document.querySelector('#notickets-msg').style.display = 'none';
        }
    })