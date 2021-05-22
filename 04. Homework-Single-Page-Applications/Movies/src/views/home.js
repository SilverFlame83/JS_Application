import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllMovies} from '../api/data.js'

const homeTemplate=(movies,isUser) => html`
    <section id="home-page">
        <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
            <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
                 class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px">
            <h1 class="display-4">Movies</h1>
            <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
        </div>
    </section>

    <h1 class="text-center">Movies</h1>
    ${isUser? html`<section id="add-movie-button">
        <a href="/addMovie" class="btn btn-warning ">Add Movie</a>
    </section>`: ''}
    <section id="movie">
        <div class=" mt-3 ">
            <div class="row d-flex d-wrap">

                <div class="card-deck d-flex justify-content-center">
                ${movies.map(movieItem)}
                </div>
            </div>
        </div>
    </section>
`;

const movieItem= (item)=> html`
 <div class="card mb-4">
    <img class="card-img-top" src=${item.img}
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${item.title}</h4>
    </div>
    ${sessionStorage.getItem('email')!=null ? html`<div class="card-footer">
    <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
    </div>`:''}

</div>
`;

export async function homePage(ctx){
    const userId = sessionStorage.getItem('userId');
    
    const movies = await getAllMovies();
    ctx.render(homeTemplate(movies,userId != null));
}