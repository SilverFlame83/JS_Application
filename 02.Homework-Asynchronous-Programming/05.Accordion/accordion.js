const main = document.getElementById('main');
async function solution() {

    function e(type, attributes, ...content) {
        const result = document.createElement(type);

        for (let [attr, value] of Object.entries(attributes || {})) {
            if (attr.substring(0, 2) == 'on') {
                result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attr] = value;
            }
        }

        content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

        content.forEach(e => {
            if (typeof e == 'string' || typeof e == 'number') {
                const node = document.createTextNode(e);
                result.appendChild(node);
            } else {
                result.appendChild(e);
            }
        });

        return result;
    }

    async function getList() {
        const url = `http://localhost:3030/jsonstore/advanced/articles/list`
        let response = await fetch(url)
        let data = await response.json()
        return data

    }

    let list = await getList()
    for (let [title, id] of Object.entries(list)) {
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id._id}`
        let response = await fetch(url)
        let data = await response.json()
        let content = data.content


        const accordionDiv = e('div', { className: 'accordion' });
        main.appendChild(accordionDiv);

        const divHead = e('div', { className: 'head' });
        accordionDiv.appendChild(divHead);

        const span = e('span', '', id.title);
        divHead.appendChild(span);
        const btn = e('button', { className: 'button', id: `${id._id}`}, 'More');
        divHead.appendChild(btn);


        const extraDiv = e('div', { className: 'extra', 'style': 'display: none;' });
        accordionDiv.appendChild(extraDiv);

        const paragraph = document.createElement('p')
        paragraph.textContent = content;
        extraDiv.appendChild(paragraph)


    }
    window.addEventListener('click', (e) => {
        if (e.target.classList == 'button') {
            if (e.target.parentNode.parentNode.querySelector('.extra').style.display == 'inline-block') {
                e.target.parentNode.parentNode.querySelector('.extra').style.display = ''
                e.target.parentNode.querySelector('button').textContent = 'More'
            }
            else {
                e.target.parentNode.parentNode.querySelector('.extra').style.display = 'inline-block'
                e.target.parentNode.querySelector('button').textContent = 'Show Less'
            }
        }

    })

    //  function lessOrMore(el) {
    //     const div = document.querySelector('.extra');
    //     const btn = document.querySelector('button');


    //     if (div.style.display === 'inline-block') {
    //         div.style.display = '';
    //         btn.textContent = 'More'
    //     } else {
    //         div.style.display = 'inline-block';
    //         btn.textContent = 'Less';
    //     }
    // }
};
solution();