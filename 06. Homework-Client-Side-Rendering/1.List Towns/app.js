import { html, render } from './node_modules/lit-html/lit-html.js';


const cardTemplate = (data) => html`
   <ul>
    ${data.map(t => html`<li>${t}</li>`)}
   </ul>
`;
document.getElementById('btnLoadTowns').addEventListener('click',updateList);

function updateList(e) {
    e.preventDefault();
    //parse input
    const townsAsString = document.getElementById('towns').value;
    const root = document.getElementById('root');

    const towns = townsAsString.split(', ').map(x => x.trim());
    
    const result = cardTemplate(towns);
    render(result, root);
}
