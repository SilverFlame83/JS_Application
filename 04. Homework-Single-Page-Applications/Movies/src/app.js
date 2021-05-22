import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import * as api from './api/data.js';

import {logout} from './api/data.js';
import { homePage } from './views/home.js';
import { addMoviePage } from './views/addMovie.js';
import { deletePage } from './views/delete.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
window.api = api;

const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click',async()=>{
    await logout();
    setUserNav();
    page.redirect('/login');
});


page('/',decorateTemplate, homePage);
page('/login',decorateTemplate,loginPage);
page('/register',decorateTemplate,registerPage);
page('/addMovie',decorateTemplate,addMoviePage);
page('/details/:id',decorateTemplate,detailsPage);
page('/edit/:id',decorateTemplate,editPage);
page('/delete',decorateTemplate,deletePage);

setUserNav();
page.start();

export async function decorateTemplate(ctx,next){
    ctx.render = (content)=> render(content,main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav(){
     const token  = sessionStorage.getItem('email');
    if (token != null){
        document.getElementById('welcomeMsg').textContent = `Welcome,${token}`;
        [...document.querySelectorAll('nav .user')].forEach(a=> a.style.display= 'block');
        [...document.querySelectorAll('nav .guest')].forEach(a=> a.style.display= 'none');
    } else {
        [...document.querySelectorAll('nav .user')].forEach(a=> a.style.display= 'none');
        [...document.querySelectorAll('nav .guest')].forEach(a=> a.style.display= 'block');
    }
 
}