import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import {
    renderGallery,
    initializeLightbox,
    refreshLightbox,
} from './js/render-functions';
import { perPage } from './js/pixabay-api';

const refs = {
    form: document.querySelector('.form'),
    input: document.querySelector('[name="search-text"]'),
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
    addImagesBtn: document.querySelector('[type="button"]'),
};

initializeLightbox('.gallery a');

let userRequest = null;
let currentPage = 1;
let totalPages = 0;

refs.form.addEventListener('submit', onSearchSubmit);
refs.addImagesBtn.addEventListener('click', onLoadMoreClick);

async function onSearchSubmit(event) {
    event.preventDefault();
    currentPage = 1;
    totalPages = 0;
    refs.gallery.innerHTML = '';
    refs.addImagesBtn.classList.add('visually-hidden');

    userRequest = refs.input.value.trim();

    if (userRequest === '') {
    iziToast.error({
        title: 'Error:',
        message: 'Please fill in the search field before submitting!',
        position: 'topRight',
    });
    return;
    }

    refs.loader.hidden = false;

    try {
    const { images, totalHits } = await fetchImages(userRequest);

    renderGallery(refs.gallery, images);
    refreshLightbox();

    totalPages = Math.ceil(totalHits / perPage);

    if (totalPages > currentPage) {
        refs.addImagesBtn.classList.remove('visually-hidden');
    }
    } catch (error) {
    console.error('Error:', error);
    } finally {
    refs.loader.hidden = true;
    refs.form.reset();
    }
}

async function onLoadMoreClick() {
    currentPage += 1;

    try {
    refs.addImagesBtn.classList.add('visually-hidden');
    refs.loader.hidden = false;

    const { images } = await fetchImages(userRequest, currentPage);
    renderGallery(refs.gallery, images);
    refreshLightbox();

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });

    if (currentPage >= totalPages) {
        refs.addImagesBtn.classList.add('visually-hidden');
        iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        });
    } else {
        refs.addImagesBtn.classList.remove('visually-hidden');
    }
    } catch (error) {
    console.error('Error:', error);
    } finally {
    refs.loader.hidden = true;
    }
}