function solve() {
    const departButton = document.getElementById('depart');
    const arriveButtton = document.getElementById('arrive');
    const infoBox = document.querySelector('#info span');
    

    let stops = {
        next: 'depot'
    }
    async function depart() {
        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + stops.next;
        const response = await fetch(url);
        const data = await response.json();
        
        stops = data;

        infoBox.textContent = `Next stop ${stops.name}`;

        departButton.disabled = true;
        arriveButtton.disabled = false;

    }

    function arrive() {

        infoBox.textContent = `Arriving at ${stops.name}`;

        departButton.disabled = false;
        arriveButtton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();

