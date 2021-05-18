document.querySelector('form').addEventListener('submit',onRegisterSubmit);

async function onRegisterSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if(email =='' || password ==''){
        return alert('All fields required!')
    } else if(password != rePass){
        return alert ('Passwords don not match!')
    }

    const response = fetch('http://localhost:3030/users/register',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
    });

    if(response.ok == false){
       const err = await response.json();
       return alert (err.message);
    }

    const data = (await response).json()
    sessionStorage.setItem('userToken',data.accessToken);
    window.location.pathname = 'index.html';
}