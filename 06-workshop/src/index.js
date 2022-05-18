import './styles/_variables.css';
import './components/article/style.css';
import './layouts/base/style.css';
import './layouts/base/components/header/style.css';
import './layouts/base/components/footer/style.css';
import './pages/index/style.css';

import indexTemplate from './pages/index/index.hbs';
import articleTemplate from './components/article/article.hbs';

const urls = ['data1.json', 'data2.json', 'data3.json', 'data4.json'];

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  root.innerHTML = indexTemplate();
  const content = document.getElementsByClassName('content')[0];

  /*
   *  Place your code here
   */

  const preLoader = document.createElement('span');

  preLoader.className = 'preloader';
  preLoader.textContent = 'Loading...';

  content.appendChild(preLoader);

  const requests = urls.map((url) => fetch(`api/${url}`)
    .then((response) => (response.ok ? response : Promise.reject(response.statusText)))
    .catch((err) => console.error(err)));

  Promise.all(requests)
    .then((responses) => Promise.all(
      responses.map((response) => response?.json().catch(() => ({ status: false, data: [] })))
    ))
    .then((results) => {
      content.removeChild(document.querySelector('.preloader'));
      results.forEach((result) => {
        result?.data.forEach((item) => {
          content.innerHTML += articleTemplate(item);
        });
      });
    });
});
