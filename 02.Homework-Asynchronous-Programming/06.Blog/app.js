function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}

attachEvents();

async function getPosts() {

    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const response = await fetch(url);
    const data = await response.json();

    const select = document.getElementById('posts');

    Object.values(data).map(createOption).forEach(o => select.appendChild(o));
};

function displayPost() {
    const postId = document.getElementById('posts').value;
    getComments(postId);
};

function createOption(post) {
    const result = document.createElement('option');
    result.textContent = post.title;
    result.value = post.id;

    return result;
};

async function getComments(postId) {
    const postUrl = 'http://localhost:3030/jsonstore/blog/posts/' + postId;
    const postResponse = await fetch(postUrl);
    const postData = await postResponse.json();


    document.getElementById('post-title').textContent = postData.title;
    document.getElementById('post-body').textContent = postData.body;

    const url = 'http://localhost:3030/jsonstore/blog/comments'

    const commentResponse = await fetch(url);
    const commentData = await commentResponse.json();

    const comments = Object.values(commentData).filter(c => c.postId == postId)

    const commentsUl = document.getElementById('post-comments');

    comments.map(createComm).forEach(c=> commentsUl.appendChild(c));
}
function createComm(comment){
    const result = document.createElement('li');
    result.textContent = comment.text;
    result.id = comment.id;

    return result;
}