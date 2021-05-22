import {html} from '../../node_modules/lit-html/lit-html.js';
import{getMovieById, deleteMovie, addLike } from '../api/data.js';

const detailsTemplate = (movie,isCreator,onDelete, onClick)=> html`
<section id="movie-details">
            <div class="container">
                <div class="row bg-light text-dark">
                    <h1>${movie.title}</h1>

                    <div class="col-md-8">
                        <img class="img-thumbnail" src=${movie.img}
                            alt="Movie">
                    </div>
                    <div class="col-md-4 text-center">
                        <h3 class="my-3 ">Movie Description</h3>
                        <p>${movie.description}</p>
                        ${isCreator? html `<a class="btn btn-danger" @click=${onDelete} href="javascript:void(0)">Delete</a>
                        <a class="btn btn-warning" href=${`/edit/${movie._id}`}>Edit</a>
                        <span class="enrolled-span">Liked ?</span>`: html`<a class="btn btn-primary" @click=${onClick} href="javascript:void(0)">Like</a>`}
                  
                    </div>
                </div>
            </div>
        </section>
`;


export async function detailsPage(ctx){
    const id = ctx.params.id;
    const movie = await getMovieById(id);
    const logedPerson = sessionStorage.getItem('userId');
   
    ctx.render(detailsTemplate(movie,movie._ownerId ==logedPerson, onDelete,onClick));

    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete the movie');
        if(confirmed){
            await deleteMovie(movie._id);
            ctx.page.redirect('/');
        }
    }

    async function onClick(event){
        const movieId = movie._id
        const data = {movieId,logedPerson}
        await addLike(data);
        event.target.remove()
    }
}

