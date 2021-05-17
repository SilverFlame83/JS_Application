const mainPage = document.getElementById('main')
async function lockedProfile() {

    const users = await getUsers();

    Object.values(users).forEach((user, i) => {
        mainPage.appendChild(e('div', { 'className': 'profile' },
            e('img', { 'src': './iconProfile2.png', 'className': 'userIcon' }),
            e('label', '', 'Lock'),
            e('input', { 'type': 'radio', 'name': `user${i + 2}Locked`, 'value': 'lock', 'checked': true }),
            e('label', '', 'Unlock'),
            e('input', { 'type': 'radio', 'name': `user${i + 2}Locked`, 'value': 'unlock' }),
            e('br'),
            e('hr'),
            e('label', '', 'Username'),
            e('input', { 'type': 'text', 'name': `user${i + 2}Username`, 'value': user.username, 'disabled': true, 'readonly': true }),
            e('div', { 'id': `user${i + 2}HiddenFields`, 'style': 'display: none;' },
                e('hr'),
                e('label', '', 'Email:'),
                e('input', { 'type': 'email', 'name': `user${i + 2}Email`, 'value': user.email, 'disabled': true, 'readonly': true }),
                e('label', '', 'Age:'),
                e('input', { 'type': 'email', 'name': `user${i + 2}Age`, 'value': user.age, 'disabled': true, 'readonly': true })
            ),
            e('button', { 'onClick': checkProfile }, 'Show more')
        ))
    })
}
async function getUsers() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const response = await fetch(url);
    const userData = await response.json();

    return userData;
}
function checkProfile(e) {

    const profile = e.target.parentNode;
    const isLocked = profile
        .querySelector('input[type=radio]:checked').value === 'lock';

    if (isLocked) {
        return;
    }

    let div = profile.querySelector('div');
    let isVisible = div.style.display === 'block';
    div.style.display = isVisible ? 'none' : 'block';
    e.target.textContent = isVisible ? 'Hide it' : 'Show more'

}
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