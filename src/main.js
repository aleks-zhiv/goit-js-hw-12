import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import {
    renderGallery,
    initializeLightbox,
    refreshLightbox,
} from './js/render-functions';

const refs = {
    form: document.querySelector('.form'),
    input: document.querySelector('[name="search-text"]'),
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
};

initializeLightbox('.gallery a');

refs.form.addEventListener('submit', event => {
    event.preventDefault();
    const userRequest = refs.input.value.trim();

    refs.gallery.innerHTML = '';

    if (userRequest === '') {
    iziToast.error({
        title: 'Error:',
        message: 'Please fill in the search field before submitting!',
        position: 'topRight',
    });
    return;
    }

    refs.loader.hidden = false;

    fetchImages(userRequest)
    .then(images => {
        if (images) {
        renderGallery(refs.gallery, images);
        refreshLightbox();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        refs.loader.hidden = true;
        refs.form.reset();
    });
});