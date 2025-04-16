// Déclaration de la fonction pour générer les résultats de recherche
function displayResults(data) {
    if (data === 0) {
        document.querySelector('#notickets-msg').style.display = 'block';
    } else {
    
    document.querySelector('#notickets-msg').style.display = 'none';
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
                totalCount -= deleteButtons[j].price;
                document.querySelector('#totalCount').textContent = `${totalCount} €`;
               })
            
        })   
    }
    } 
}



// On écoute l'événement "clic" du bouton de recherche
fetch('http://localhost:3000/carts')
    .then(response => response.json())
    .then(data => {
        console.log(`Tickets trouvés : ${data.allCarts}`);
        // deletePreviousContent();
        displayResults(data.allCarts);
    })