import {html} from '../../node_modules/lit-html/lit-html.js';
import {register} from '../api/data.js';

const registerTemplate= (onSubmit) => html`
     <section id="form-sign-up">
    <form @submit=${onSubmit}class="text-center border border-light p-5" action="#" method="post">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
        </div>

        <input type="submit" class="btn btn-primary" value="Register" />
    </form>
    </section>
`;


export async function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('repeatPassword');

        if(email == ''|| password == ''){
            return alert('All fields are required!');
        }
        if(password != rePass){
            return alert ('Passwords don\t match!');
        }

        await register(email, password);
        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}