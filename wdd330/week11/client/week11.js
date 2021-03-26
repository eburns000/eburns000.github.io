import { makeRequest } from './authHelps.js';
import Auth from './auth.js';

var authInstance = new Auth();
var postsDiv = document.getElementById('posts');
var titleInput = document.getElementById('title');
var contentInput = document.getElementById('content');

async function loadPosts() {
  postsDiv.innerHTML = '';
  const posts = await makeRequest('posts', 'GET', null, authInstance.jwtToken);
  console.log(posts);
  for (const post of posts) {
    postsDiv.innerHTML += post.content + '<br><br>'
  }
}

async function addPost(title, content) {
  await makeRequest('posts', 'POST', {title: title, content: content}, authInstance.jwtToken);
  loadPosts();
}

var loginForm = document.getElementById('login');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  authInstance.login(loadPosts);
});

var addPostForm = document.getElementById('add-post');
addPostForm.addEventListener('submit', e => {
  e.preventDefault();
  addPost(titleInput.value, contentInput.value);
});



export default {
}