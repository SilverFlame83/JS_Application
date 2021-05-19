const listOfCatches = document.getElementById('catches');

function attachEvents() {
    listOfCatches.innerHTML = '';

    if (!sessionStorage.getItem('token')) {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('logged').style.display = 'none';
    } else {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('logged').style.display = 'inline-block';

        document.getElementById('add').disabled = false;
        document.getElementById('add').addEventListener('click', async () => {
            const angler = document.querySelector('#addForm [class="angler"]').value;
            const weight = document.querySelector('#addForm [class="weight"]').value;
            const species = document.querySelector('#addForm [class="species"]').value;
            const location = document.querySelector('#addForm [class="location"]').value;
            const bait = document.querySelector('#addForm [class="bait"]').value;
            const captureTime = document.querySelector('#addForm [class="captureTime"]').value;

            if (!angler || !Number(weight) || !species || !location || !bait || !Number(captureTime)) {
                return;
            }

            document.querySelector('#addForm [class="angler"]').value = '';
            document.querySelector('#addForm [class="weight"]').value = '';
            document.querySelector('#addForm [class="species"]').value = '';
            document.querySelector('#addForm [class="location"]').value = '';
            document.querySelector('#addForm [class="bait"]').value = '';
            document.querySelector('#addForm [class="captureTime"]').value = '';

            const newCatch = {
                angler,
                weight: Number(weight),
                species,
                location,
                bait, 'captureTime ': Number(captureTime)
            };
            createANewCatch(newCatch);
        });

        document.getElementById('logged').addEventListener('click', () => {
            sessionStorage.clear();
        });
    }

    document.querySelector('.load').addEventListener('click', getAllCatches);
}

attachEvents();

async function request(url, options) {
    const response = await fetch(url, options);
    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }
    const data = await response.json();
    return data;
}

//function to load all catches from server and display them
async function getAllCatches() {
    const catches = await request('http://localhost:3030/data/catches');

    const getCatch = Object.values(catches);
    displayCatches(getCatch);
    //console.log(result)

}
//getAllCatches();

function displayCatches(catches) {
    for (let c of catches) {
        const result = e('div', { className: 'catch' },
            e('label', {}, 'Angler'),
            e('input', { type: 'text', className: 'angler', value: `${c.angler}` }),
            e('hr', {}),
            e('label', {}, 'Weight'),
            e('input', { type: 'number', className: 'weight', value: `${c.weight}` }),
            e('hr', {}),
            e('species', {}, 'Species'),
            e('input', { type: 'text', className: 'species', value: `${c.species}` }),
            e('hr', {}),
            e('label', {}, 'Location'),
            e('input', { type: 'text', className: 'location', value: `${c.location}` }),
            e('hr', {}),
            e('label', {}, 'Bait'),
            e('input', { type: 'text', className: 'bait', value: `${c.bait}` }),
            e('hr', {}),
            e('label', {}, 'Capture Time'),
            e('input', { type: 'number', className: 'captureTime', value: `${c['captureTime ']}` }),
            e('hr', {}),
            e('button', { disabled: true, className: 'update' }, 'Update'),
            e('button', { disabled: true, className: 'delete' }, 'Delete')
        );
        if (c._ownerId == sessionStorage.getItem('id')) {
            result.querySelector('.update').disabled = false;
            result.querySelector('.delete').disabled = false;

            result.querySelector('.update').addEventListener('click',function(){updateInformation(c._id,event)});
          
            result.querySelector('.delete').addEventListener('click', async () => {
                const confimation = confirm('Are you sure you want to delete?');
                if (confimation) {
                    deleteCatch(c._id);
                }
            });
        }
        listOfCatches.appendChild(result);
    }
}

function updateInformation(id,e) {
    const result = e.target.parentNode.children;

    const angler = result[1].value;
    const weight = result[4].value;
    const species = result[7].value;
    const location = result[10].value;
    const bait = result[13].value;
    const captureTime = result[16].value;

    if (!angler || !Number(weight) || !species || !location || !bait || !Number(captureTime)) {
        return;
    }

    const updatedCatch = { 
        angler, 
        weight: Number(weight), 
        species, 
        location, 
        bait, 'captureTime ': Number(captureTime) };
    updateCatch(id, updatedCatch);
 }

//function for creating a new catch
async function createANewCatch(newCatch) {
    await request('http://localhost:3030/data/catches ', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': `${sessionStorage.getItem('token')}` },
        body: JSON.stringify(newCatch)
    });
    getAllCatches();
}

//function for updaiting a catch using catchID
async function updateCatch(id, updatedCatch) {
    await request('http://localhost:3030/data/catches/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': `${sessionStorage.getItem('token')}` },
        body: JSON.stringify(updatedCatch)
    });

    getAllCatches();
}

async function deleteCatch(id) {
    await request('http://localhost:3030/data/catches/' + id, {
        method: 'delete',
        headers: { 'X-Authorization': `${sessionStorage.getItem('token')}` }
    });

    getAllCatches();
}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}