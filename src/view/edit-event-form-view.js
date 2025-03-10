import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

function createEditEventFormTemplate(point, offers, destinations) {
  const { id, dateFrom, dateTo, destination, type, basePrice } = point;
  const formattedDateFrom = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const formattedDateTo = dayjs(dateTo).format('DD/MM/YY HH:mm');
  const destinationData = destinations.find((dest) => dest.id === destination) || {};
  const availableOffers = offers.find((offer) => offer.type === type)?.offers || [];

  function createOffersTemplate() {
    return availableOffers.length > 0
      ? availableOffers.map((offer) => `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer" checked>
          <label class="event__offer-label" for="event-offer-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `).join('')
      : '<p class="event__no-offers">No available offers</p>';
  }

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-${id}" type="checkbox">
          </div>

          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-${id}">${type}</label>
            <input class="event__input event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destinationData.name || ''}" list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${destinations.map((dest) => `<option value="${dest.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <input class="event__input event__input--time" type="text" name="event-start-time" value="${formattedDateFrom}">
            &mdash;
            <input class="event__input event__input--time" type="text" name="event-end-time" value="${formattedDateTo}">
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label">&euro;</label>
            <input class="event__input event__input--price" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          <section class="event__section event__section--offers">
            <h3 class="event__section-title event__section-title--offers">Offers</h3>
            <div class="event__available-offers">${createOffersTemplate()}</div>
          </section>

          <section class="event__section event__section--destination">
            <h3 class="event__section-title event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destinationData.description || 'No description available'}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${(destinationData.pictures || []).map((pic) => `<img class="event__photo" src="${pic.src}" alt="Event photo">`).join('')}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  `;
}
export default class EditEventFormView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #onFormSubmit = null;
  #onEditClose = null;

  constructor({ point, offers, destinations, onFormSubmit, onEditClose }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onFormSubmit = onFormSubmit;
    this.#onEditClose = onEditClose;

    this.element.querySelector('form')
      .addEventListener('submit', this.#handleFormSubmit);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#handleEditClose);
  }

  get template() {
    return createEditEventFormTemplate(this.#point, this.#offers, this.#destinations);
  }

  #handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit();
  };

  #handleEditClose = (evt) => {
    evt.preventDefault();
    if (this.#onEditClose) {
      this.#onEditClose();
    }
  };
}
