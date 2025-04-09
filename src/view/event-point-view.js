import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import { calculateDuration } from '../utils/utils.js';

function createEventPointTemplate(point, destination, offers) {
  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${point.dateFrom}">${dayjs(point.dateFrom).format('MMM D')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${point.dateFrom}">${dayjs(point.dateFrom).format('HH:mm')}</time>
            —
            <time class="event__end-time" datetime="${point.dateTo}">${dayjs(point.dateTo).format('HH:mm')}</time>
          </p>
          <p class="event__duration">${calculateDuration(point.dateFrom, point.dateTo)}</p>
        </div>
        <p class="event__price">
          &euro; <span class="event__price-value">${point.basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map((offer) => `
            <li class="event__offer">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </li>`).join('')}
        </ul>
        <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.485 4.455 1.62-9.44-6.865-6.69 9.475-1.39L14 0l4.255 7.935 9.475 1.39-6.865 6.69 1.62 9.44z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
}

export default class EventPointView extends AbstractView {
  #point = null;
  #destination = null;
  #offers = null;
  #onEditClick = null;
  #onFavoriteClick = null;

  constructor({ point, destination, offers, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#onEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editButtonClickHandler);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteButtonClickHandler);
  }

  get template() {
    return createEventPointTemplate(this.#point, this.#destination, this.#offers);
  }

  #editButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
