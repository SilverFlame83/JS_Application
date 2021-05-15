//async-await

async function loadRepos() {
	const username = document.querySelector('#username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	try {
		const response = await fetch(url);
		if (response.status === 404) {
			throw new Error('User not found');
		}
		console.log(response);

		
		const data = await response.json();
		console.log('Promise fulfilled');
		console.log(data);

		
		const ul = document.querySelector('#repos');
		ul.innerHTML = '';
		data.forEach(repo => {
			const li = document.createElement('li');
			li.textContent = repo.full_name;
			ul.appendChild(li);

		});
	} catch (err) {
		console.log('Promise rejected');
		console.log(err)
	}

}


// fetch-then Solution
function loadRepos() {
	const username = document.querySelector('#username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(response => {
			if (response.status === 404) {
				throw new Error ('User not found');
			}
			console.log(response);
			response.json();
		})
		.then(data => {
			console.log('Promise fulfilled');
			console.log(data);
			// const ul = document.querySelector('#repos');
			// ul.innerHTML = '';
			// data.forEach(repo =>{
			// 	const li = document.createElement('li');
			// 	li.textContent = repo.full_name;
			// 	ul.appendChild(li);

			// })
		})
		.catch(error => {
			console.log('Promise rejected');
			console.log(error);
		})
}

//ThirdSolution

function loadRepos() {
	const username = document.getElementById('username').value;

	const url = `https://api.github.com/users/${username}/repos`;

	const requestPromise = fetch(url);
	console.log(requestPromise);
	requestPromise.then(handleResponse);

	function handleResponse(response){
		console.log(response);
		const dataPromise = response.json();
		dataPromise.then(handleData);
	}

	function handleData(data){
		console.log(data)
	}

}
