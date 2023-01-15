import { galleryItems } from './gallery-items';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');

function createGalleryMarkup({ preview, original, description } = {}) {
  return `
    <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
    `;
}

const galleryItemsMarkup = galleryItems.map(createGalleryMarkup).join('');

galleryEl.innerHTML = galleryItemsMarkup;

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
