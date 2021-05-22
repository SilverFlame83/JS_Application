import * as api from './api.js';


const host =  'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllMovies(){
    return await api.get(host +'/data/movies');
}

export async function getMovieById(id){
    return await api.get(host + '/data/movies/' + id);
}

export async function getMovieLikes(){
    const movieId = sessionStorage.getItem('movieId')
    return await api.get(`http://localhost:3030/data/likes?where=movieId%3D${movieId} `);
}

export async function createMovie(data){
    return await api.post(host + '/data/movies', data) 
}
export async function addLike(data){
    return await api.post(host + '/data/likes', data) 
}

export async function updateMovie(id, data){
    return await api.put(host + '/data/movies/' + id, data);
}

export async function deleteMovie(id) {
    return await api.del(host + '/data/movies/' + id);
}

export async function revokeLike(id) {
    return await api.del(host + '/data/likes/' + id);
}