document.querySelector('#search-button').addEventListener('click', function() {
    console.log(document.querySelector('#search-date').value);
})

function createTripRow(data) {
    const lastRows = document.querySelectorAll('.row');

    for (let j = 0; j < lastRows.length; j++) {
        lastRows[j].remove();
    }
    
    for (let i = 0; i < data.searchTrips.length; i++) {
        document.querySelector('#trips-container').innerHTML += `
        <div class="row">
            <p>${data.searchTrips[i].departure} > ${data.searchTrips[i].arrival} </p>
            <p>${data.searchTrips[i].date}</p>
            <p>${data.searchTrips[i].price}</p>
            <button id="book-button" type="button">Book</button>
        </div>
        `
    }
    
}

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
            createTripRow(data);
        })
})