import './styles/_variables.css';
import './components/post/style.css';
import './layouts/base/style.css';
import './layouts/base/components/header/style.css';
import './layouts/base/components/footer/style.css';
import './pages/index/style.css';

import indexTemplate from './pages/index/index.hbs';
import postTemplate from './components/post/post.hbs';

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('root');
  root.innerHTML = indexTemplate();
  const content = document.getElementsByClassName('content')[0];

  // eslint-disable-next-line no-use-before-define
  const posts = await getPosts();

  posts.data.forEach((post) => {
    content.insertAdjacentHTML('beforeend', postTemplate(post));
  });
});

const getPosts = async () => {
  const response = await fetch('api/data.json');

  return response.json();
};
