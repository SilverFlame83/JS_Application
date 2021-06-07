import * as api from './api.js';


const host =  'http://localhost:3030';
api.settings.host = host;

//правя ги на променлива за да мога да ги изнеса
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//implement application -specific requests- функции за конкретното приложение

//exam end-point depends the condition
export async function getFurniture(){
    return await api.get(host +'/data/catalog');
}
//exam
export async function getItemById(id){
    return await api.get(host + '/data/catalog/' + id);
}

export async function getMyFurniture(){
    const userId = sessionStorage.getItem('userId')
    return await api.get(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`);
}
//exam
export async function createRecord(data){
    return await api.post(host + '/data/catalog', data) 
}
//exam
export async function editRecord(id, data){
    return await api.put(host + '/data/catalog/' + id, data);
}
//exam
export async function deleteRecord(id) {
    return await api.del(host + '/data/catalog/' + id);
}