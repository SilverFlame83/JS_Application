import { html } from '../../node_modules/lit-html/lit-html.js';
import { createMovie } from '../api/data.js';

const addMovieTemplate = (onSubmit)=> html `
  <section id="add-movie">
            <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
                <h1>Add Movie</h1>
                <div class="form-group">
                    <label for="title">Movie Title</label>
                    <input type="text" class="form-control" placeholder="Title" name="title" value="">
                </div>
                <div class="form-group">
                    <label for="description">Movie Description</label>
                    <textarea class="form-control" placeholder="Description" name="description"></textarea>
                </div>
                <div class="form-group">
                    <label for="imageUrl">Image url</label>
                    <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
                </div>
                <input type="submit" class="btn btn-info" value="ADD" />
            </form>
        </section>
`;


 export async function addMoviePage(ctx) {
    ctx.render(addMovieTemplate(onSubmit));
    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('imageUrl');

        if (title == '' || description == '' || img == ''){
            return alert ('All fields are required')
        }
        const data = {title,description,img}
        console.log(data)
        
        await createMovie(data);

        ctx.page.redirect('/');
    }
 }