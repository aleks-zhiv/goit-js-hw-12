import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function fetchImages(query) {
    const API_KEY = '49477848-89e25f92574c797f7074d31b9';
    const BASE_URL = 'https://pixabay.com/api/';

    return axios
    .get(BASE_URL, {
        params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        },
    })
    .then(response => {
        if (response.data.hits.length === 0) {
        iziToast.info({
            title: 'No results!',
            message:
            'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
        });
        return null;
        } else {
        return response.data.hits;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}