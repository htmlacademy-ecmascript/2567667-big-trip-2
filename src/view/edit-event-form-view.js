import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

function createEventTypeListTemplate(type, id) {
  return `
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${EVENT_TYPES.map((eventType) => `
          <div class="event__type-item">
            <input id="event-type-${eventType}-${id}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${eventType}" ${eventType === type ? 'checked' : ''}>
            <label class="event__type-label event__type-label--${eventType}" for="event-type-${eventType}-${id}">${eventType}</label>
          </div>
        `).join('')}
      </fieldset>
    </div>
  `;
}

function createEditEventFormTemplate(state, destinations) {
  const { id, dateFrom, dateTo, destination, type, basePrice, availableOffers } = state;
  const formattedDateFrom = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const formattedDateTo = dayjs(dateTo).format('DD/MM/YY HH:mm');
  const destinationData = destinations.find((dest) => dest.id === destination) || { name: '', description: '', pictures: [] };

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
            <label class="event__type event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-${id}" type="checkbox">
            ${createEventTypeListTemplate(type, id)}
          </div>

          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-${id}">${type}</label>
            <input class="event__input event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destinationData.name}" list="destination-list-${id}">
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
            <p class="event__destination-description">${destinationData.description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${destinationData.pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="Event photo">`).join('')}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  `;
}

export default class EditEventFormView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #onFormSubmit = null;
  #onEditClose = null;

  constructor({ point, offers, destinations, onFormSubmit, onEditClose }) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onFormSubmit = onFormSubmit;
    this.#onEditClose = onEditClose;

    const availableOffers = offers.find((o) => o.type === point.type)?.offers || [];

    this._setState({
      ...EditEventFormView.parsePointToState(point),
      availableOffers
    });

    this._restoreHandlers();
  }

  get template() {
    return createEditEventFormTemplate(this._state, this.#destinations);
  }

  static parsePointToState(point) {
    return {
      ...point
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    delete point.availableOffers;
    return point;
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#handleFormSubmit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleEditClose);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#handleTypeChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#handleDestinationChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#handlePriceChange);
  }

  #handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EditEventFormView.parseStateToPoint(this._state));
  };

  #handleEditClose = (evt) => {
    evt.preventDefault();
    if (this.#onEditClose) {
      this.#onEditClose();
    }
  };

  #handleTypeChange = (evt) => {
    const newType = evt.target.value;
    const newOffers = this.#offers.find((o) => o.type === newType)?.offers || [];

    this.updateElement({
      type: newType,
      availableOffers: newOffers
    });
  };

  #handleDestinationChange = (evt) => {
    const selectedDest = this.#destinations.find((d) => d.name === evt.target.value);
    if (selectedDest) {
      this.updateElement({ destination: selectedDest.id });
    }
  };

  #handlePriceChange = (evt) => {
    this.updateElement({ basePrice: Number(evt.target.value) });
  };
}
