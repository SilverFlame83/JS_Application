async function request(url, options) {
    const response = await fetch(url, options);
    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        //should throw, because if not it will continue below
        throw new Error(error.message);
    }
    const data = await response.json();
    return data;
}
//function to load all books from server and display them
async function getAllBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');

    const rows = Object.entries(books).map(createRow).join('');
    document.querySelector('tbody').innerHTML = rows;
}
function createRow([id, book]) {
    //data- е всеки атриб.,които ние сме създали и можем да си сложим каквото стойност си искаме
    const result = `
    <tr data-id="${id}">
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </td>
    </tr>`;
    return result;
}
//function for creating a new book
async function createBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }

    await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    event.target.reset();
    getAllBooks();
}

//function for updaiting an existing book using ID
async function updateBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get("id");
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }

    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    document.getElementById('createForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
    event.target.reset();
    getAllBooks();
}
//function for deleting an existing book using ID
async function deleteBook(id) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });
    getAllBooks();
}

//program logic for updaiting the input form and filling existing values (on edit)
//progrom logic to reverse above changes to form

//main function
//-atach event listeners as described
//-load all books and display them

function start() {
    //event listener on the load button
    document.getElementById('loadBooks').addEventListener('click', getAllBooks);
    //event listener on the create button
    document.getElementById('createForm').addEventListener('submit', createBook);

    document.getElementById('editForm').addEventListener('submit', updateBook);
    //event listeners on the delete and edit buttons
    document.querySelector('table').addEventListener('click', handleTableClick)
    getAllBooks();
}
start();

function handleTableClick(event) {
    if (event.target.className == 'editBtn') {
        document.getElementById('createForm').style.display = 'none';
        document.getElementById('editForm').style.display = 'block';
        //dataset-сетнато преди това ръчно.id озн. достъпи property, което се казва data-id
        const bookId = event.target.parentNode.parentNode.dataset.id
        loadBookforEditing(bookId);
    } else if (event.target.className == 'deleteBtn') {
        const bookId = event.target.parentNode.parentNode.dataset.id
        deleteBook(bookId)
    }
}

async function loadBookforEditing(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    //[]търси по атрибут
    document.querySelector('#editForm [name="id"]').value = id;
    console.log(id)
    document.querySelector('#editForm [name="title"]').value = book.title;
    document.querySelector('#editForm [name="author"]').value = book.author;

}