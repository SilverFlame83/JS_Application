async function getStudents() {
    const request = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = await request.json();

    const result = Object.values(data)
        .map(createForm)
        .forEach(el => document.querySelector('tbody').appendChild(el))

    //console.log(data)
}
//getStudents()
async function createStudent(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const student = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        facultyNumber: formData.get('facultyNumber'),
        grade: formData.get('grade'),
    }

    const request = await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    });


    e.target.reset();
    getStudents();
}
function createForm(data) {
    console.log(data)
    const tr = document.createElement('tr');
    const firstName = document.createElement('td');
    firstName.textContent = data.firstName;
    tr.appendChild(firstName);

    const lastName = document.createElement('td');
    lastName.textContent = data.lastName;
    tr.appendChild(lastName);

    const facultyNum = document.createElement('td');
    facultyNum.textContent = data.facultyNumber;
    tr.appendChild(facultyNum);

    const grade = document.createElement('td');
    grade.textContent = data.grade;
    tr.appendChild(grade)

    return tr;
}
function start() {
    document.getElementById('newStudent').addEventListener('submit', createStudent);
}
start();