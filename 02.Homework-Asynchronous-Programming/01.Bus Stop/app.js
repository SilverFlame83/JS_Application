async function getInfo() {
    const input = document.getElementById('stopId') ;
    const busId = input.value;

    const url = 'http://localhost:3030/jsonstore/bus/businfo/' + busId;

    try{
        const ul = document.getElementById('buses');
        ul.innerHTML = '';
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById('stopName').textContent = data.name;
        Object.entries(data.buses).map(([busId,time])=>{
            
            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time}`;
            ul.appendChild(li);
           
        });
        li.innerHTML = '';
    } catch {
        document.getElementById('stopName').textContent = 'Error';
    }

   
}

