import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function initializeLightbox(selector) {
    lightbox = new SimpleLightbox(selector, {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    });
}

export function refreshLightbox() {
    if (lightbox) {
    lightbox.refresh();
    }
}

export function renderGallery(container, images) {
    container.innerHTML = '';

    const markup = images
    .map(
        ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        }) => {
        return `<li class="gallery-item">
            <a href="${largeImageURL}" class="gallery-item-link">
            <img class="gallery-item-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
            <p><b>Likes:</b>${likes}</p>
            <p><b>Views:</b>${views}</p>
            <p><b>Comments:</b>${comments}</p>
            <p><b>Downloads:</b>${downloads}</p>
            </div>
        </li>`;
        }
    )
    .join('');

    container.insertAdjacentHTML('beforeend', markup);
}