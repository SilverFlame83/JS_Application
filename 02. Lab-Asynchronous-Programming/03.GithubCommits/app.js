async function loadCommits() {
    const userName = document.getElementById('username');
    const repo = document.getElementById('repo');

    const url = `https://api.github.com/repos/${userName.value}/${repo.value}/commits`

    const ul = document.getElementById('commits');
    const li = document.createElement('li');

    try {
        const response = await fetch(url);
        if(response.ok == false){
            li.textContent = `Error: ${response.status} (Not found)`;
            ul.appendChild(li);
        }
        const data = await response.json();
        data.forEach(r=>{
            const li = document.createElement('li');
            li.textContent = `${r.commit.author.name}: ${r.commit.message}`;
            ul.appendChild(li)
            //console.log(r.commit.author.name)
        });

    } catch(err){
        alert('Repo is not found')
    }
}