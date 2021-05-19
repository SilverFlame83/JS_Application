function attachEvents() {
    document.getElementById('btnCreate').addEventListener('click', createContacts);
    document.getElementById('btnLoad').addEventListener('click', loadContacts);


    async function loadContacts() {
        const phoneBook = await request('http://localhost:3030/jsonstore/phonebook');

        Object.values(phoneBook)
            .map(createList)
            .forEach(el => document.getElementById('phonebook').append(el));

    }

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

    async function createContacts() {
        const person = document.getElementById('person').value;
        const phone = document.getElementById('phone').value;

        const newContact = { person, phone };

        document.getElementById('person').value = '';
        document.getElementById('phone').value = '';

        const newEntry = await request('http://localhost:3030/jsonstore/phonebook', {
            method: 'post',
            headers: { 'Content-Type': 'application/js' },
            body: JSON.stringify(newContact)

        });
        return newEntry;
    }

    function createList(phoneBook) {
        const ul = document.createElement('ul');
        if (phoneBook.person != 'undefined' && phoneBook.phone != 'undefined') {
            ul.textContent = `${phoneBook.person}: ${phoneBook.phone}`;
            ul.id = phoneBook._id;
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            ul.appendChild(delBtn);
            delBtn.addEventListener('click', function () { deleteContact(phoneBook._id) })

        }
        return ul;
    }
    async function deleteContact(id) {
        await request('http://localhost:3030/jsonstore/phonebook/' + id, {
            method: 'delete'
        });
        document.getElementById('phonebook').innerHTML = '';
        loadContacts();
    }
}

attachEvents();