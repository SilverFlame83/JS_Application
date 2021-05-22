import {html} from '../../node_modules/lit-html/lit-html.js';
import {login} from '../api/data.js';

const loginTemplate= (onSubmit) => html`
<section id="form-login">
    <form @submit=${onSubmit}class="text-center border border-light p-5" action="" method="">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <input type="submit" class="btn btn-primary" value="Login" />
    </form>
    </section>
`;

export async function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        if(email == ''|| password == ''){
            return alert('All fields are required!');
        }

        await login(email, password);
        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}