import cardTemplate from './templates/photoCard.hbs';
import ApiService from './js/apiService';
import { myError } from './js/pnotify';
import { myNotice } from './js/pnotify';
import * as basicLightbox from 'basiclightbox';
import './css/lightBox.min.css';

const refs = {
 gallery: document.querySelector('.gallery'),
 searchForm: document.querySelector('.search-form'),
 loadMoreBtn: document.querySelector('.load-more-btn'),
 wrapper: document.querySelector('.wrapper'),
};

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onLightboxOpen);

function onSearch(e) {
 e.preventDefault();
 clearMarkup();
 apiService.query = e.currentTarget.elements.query.value;
 checkRequest();
 apiService.resetPage();
 if (apiService.query.length !== 0) {
  apiService.fetchPhotos().then(renderMarkup);
 }
}

function onLoadMore() {
 apiService.fetchPhotos().then(renderMarkup);
 setTimeout(() => {
  refs.wrapper.scrollIntoView({
   behavior: 'smooth',
   block: 'start',
  });
 }, 500);
}

function renderMarkup(data) {
 if (data.length === 0) {
  refs.loadMoreBtn.classList.add('is-hidden');
  return myError();
 } else if (data.length !== 0) {
  refs.loadMoreBtn.classList.remove('is-hidden');
 }
 refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(data));
}

function clearMarkup() {
 refs.gallery.innerHTML = '';
}

function checkRequest() {
 if (apiService.query === '') {
  return myNotice();
 }
}

function onLightboxOpen(e) {
 if (e.target.nodeName !== 'IMG') {
  return;
 }
 const instance = basicLightbox.create(
  `<img src="${e.target.dataset.src}" width="800" height="600">`,
 );
 instance.show();
}
