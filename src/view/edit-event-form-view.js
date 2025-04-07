import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { EVENT_TYPES, BLANK_POINT } from '../const.js';
import he from 'he';

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

function createOffersTemplate(availableOffers, selectedOfferIds) {
  return availableOffers.map((offer, index) => {
    const isChecked = selectedOfferIds.includes(String(offer.id));
    const selectorClass = index === 0 ? 'event__offer-selector' : 'event__offer-selector';
    return `
      <div class="${selectorClass}">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${offer.id}"
          type="checkbox"
          name="event-offer"
          value="${offer.id}"
          data-offer-id="${offer.id}"
          data-cy="offer-checkbox-${offer.id}"
          ${isChecked ? 'checked' : ''}
        />
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
  }).join('');
}

function createButtonTemplate(isCreating, isDeleting) {
  const resetButtonDisabled = isDeleting;
  if (isCreating) {
    return `
      <button class="event__reset-btn" type="reset" ${resetButtonDisabled ? 'disabled' : ''}>Cancel</button>
    `;
  }
  return `
    <button class="event__reset-btn" type="reset" ${resetButtonDisabled ? 'disabled' : ''}>
      ${isDeleting ? 'Deleting...' : 'Delete'}
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  `;
}

function createEditEventFormTemplate(state, destinations, isCreating = false) {
  const {
    id,
    dateFrom,
    dateTo,
    destination,
    type,
    basePrice,
    availableOffers,
    selectedOfferIds,
    isSaving,
    isDeleting,
    isDisabled
  } = state;

  const formattedDateFrom = dateFrom ? dayjs(dateFrom).format('DD/MM/YY HH:mm') : '';
  const formattedDateTo = dateTo ? dayjs(dateTo).format('DD/MM/YY HH:mm') : '';
  const destinationData = destinations.find((dest) => dest.id === destination) || {
    name: '',
    description: '',
    pictures: []
  };

  const hasDescription = Boolean(destinationData.description?.trim());
  const hasPictures = destinationData.pictures.length > 0;
  const shouldShowDestinationSection = hasDescription || hasPictures;

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
            <input
              class="event__input event__input--destination"
              id="event-destination-${id}"
              type="text"
              name="event-destination"
              value="${he.encode(destinationData.name)}"
              list="destination-list-${id}">
            <datalist id="destination-list-${id}">
              ${destinations.map((dest) => `<option value="${he.encode(dest.name)}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <input id="event-start-time-${id}" class="event__input event__input--time" type="text" name="event-start-time" value="${formattedDateFrom}">
            &mdash;
            <input id="event-end-time-${id}" class="event__input event__input--time" type="text" name="event-end-time" value="${formattedDateTo}">
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label">&euro;</label>
            <input
              class="event__input event__input--price"
              type="number"
              name="event-price"
              value="${basePrice}"
              min="1"
              max="100000"
              step="1"
              required
              title="Цена должна быть от 1 до 100000"
            >
          </div>

          <button class="event__save-btn btn btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>

          ${createButtonTemplate(isCreating, isDeleting, isDisabled)}

        </header>

        <section class="event__details">
          ${availableOffers.length > 0
    ? `<section class="event__section event__section--offers">
                  <h3 class="event__section-title event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${createOffersTemplate(availableOffers, selectedOfferIds)}
                  </div>
                </section>` : ''}

          ${shouldShowDestinationSection
    ? `<section class="event__section event__section--destination">
                  <h3 class="event__section-title event__section-title--destination">Destination</h3>
                  ${hasDescription ? `<p class="event__destination-description">${he.encode(destinationData.description)}</p>` : ''}
                  ${hasPictures
    ? `<div class="event__photos-container">
                        <div class="event__photos-tape">
                          ${destinationData.pictures.map((pic) =>
    `<img class="event__photo" src="${pic.src}" alt="Event photo">`
  ).join('')}
                        </div>
                      </div>` : ''}
                </section>` : ''}
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
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point, offers, destinations, onFormSubmit, onEditClose }) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onFormSubmit = onFormSubmit;
    this.#onEditClose = onEditClose;

    const basePoint = point ?? {
      ...BLANK_POINT,
      destination: destinations[0]?.id || null
    };

    const allOffersByType = offers.find((o) => o.type === basePoint.type)?.offers || [];

    this._setState({
      ...EditEventFormView.parsePointToState(basePoint),
      availableOffers: allOffersByType,
      selectedOfferIds: basePoint.offers.map(String)
    });
  }

  get template() {
    return createEditEventFormTemplate(this._state, this.#destinations, this._state.isCreating);
  }

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    point.offers = state.selectedOfferIds;
    delete point.availableOffers;
    delete point.selectedOfferIds;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    delete point.isCreating;
    return point;
  }

  _restoreHandlers() {
    if (!this.element) {
      return;
    }
    this.element.querySelector('form')?.addEventListener('submit', this.#handleFormSubmit);
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#handleEditClose);
    this.element.querySelector('.event__type-group')?.addEventListener('change', this.#handleTypeChange);
    this.element.querySelector('.event__input--destination')?.addEventListener('change', this.#handleDestinationChange);
    this.element.querySelector('.event__input--price')?.addEventListener('change', this.#handlePriceChange);
    this.element.querySelector('.event__available-offers')?.addEventListener('click', this.#handleOfferClick);
    this.element.querySelector('.event__reset-btn')?.addEventListener('click', this.#handleDeleteClick);
    this.#setDatepickers();
  }

  #initDatepicker(element, defaultDate, minDate, onChange) {
    return flatpickr(element, {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      defaultDate: defaultDate || undefined,
      ...(minDate && { minDate }),
      onChange,
    });
  }

  #destroyDatepicker(datepicker) {
    if (datepicker) {
      datepicker.destroy();
    }
    return null;
  }

  #setDatepickers() {
    const dateFromInput = this.element.querySelector('input[name="event-start-time"]');
    const dateToInput = this.element.querySelector('input[name="event-end-time"]');

    this.#datepickerFrom = this.#initDatepicker(
      dateFromInput,
      this._state.dateFrom,
      null,
      this.#handleDateFromChange
    );

    this.#datepickerTo = this.#initDatepicker(
      dateToInput,
      this._state.dateTo,
      this._state.dateFrom,
      this.#handleDateToChange
    );
  }

  #handleDateFromChange = ([userDate]) => {
    const newDateFrom = userDate.toISOString();
    const isDateToInvalid = dayjs(this._state.dateTo).isBefore(dayjs(newDateFrom));
    this._state.dateFrom = newDateFrom;
    if (isDateToInvalid) {
      this._state.dateTo = newDateFrom;
      if (this.#datepickerTo) {
        this.#datepickerTo.setDate(newDateFrom);
      }
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.set('minDate', newDateFrom);
    }
  };

  #handleDateToChange = ([userDate]) => {
    const newDateTo = userDate.toISOString();
    const isBeforeFrom = dayjs(newDateTo).isBefore(dayjs(this._state.dateFrom));
    this._state.dateTo = isBeforeFrom ? this._state.dateFrom : newDateTo;
    if (this.#datepickerFrom) {
      this.#datepickerFrom.set('maxDate', this._state.dateTo);
    }
  };

  #handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EditEventFormView.parseStateToPoint(this._state));
  };

  #handleDeleteClick = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit({
      ...EditEventFormView.parseStateToPoint(this._state),
      __delete: true
    });
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
      ...this._state,
      type: newType,
      availableOffers: newOffers,
      selectedOfferIds: []
    });
  };

  #handleDestinationChange = (evt) => {
    const inputValue = he.decode(evt.target.value);
    const selectedDest = this.#destinations.find((d) => d.name === inputValue);
    if (selectedDest) {
      this.updateElement({
        ...this._state,
        destination: selectedDest.id
      });
    } else {
      evt.target.value = '';
    }
  };

  #handlePriceChange = (evt) => {
    const value = Number(evt.target.value);
    if (!isNaN(value) && value >= 0 && Number.isInteger(value)) {
      this.updateElement({
        ...this._state,
        basePrice: value
      });
    } else {
      evt.target.value = this._state.basePrice;
    }
  };

  #handleOfferChange = () => {
    const checkedOfferIds = Array.from(
      this.element.querySelectorAll('.event__offer-checkbox:checked')
    ).map((input) => input.dataset.offerId);

    this.updateElement({
      ...this._state,
      selectedOfferIds: checkedOfferIds
    });
  };

  #handleOfferClick = (evt) => {
    const label = evt.target.closest('.event__offer-label');
    if (!label) {
      return;
    }

    const inputId = label.getAttribute('for');
    const input = this.element.querySelector(`#${inputId}`);
    if (!input) {
      return;
    }

    input.checked = !input.checked;
    this.#handleOfferChange();
  };

  setSaving() {
    this.updateElement({
      ...this._state,
      isDisabled: true,
      isSaving: true,
    });
  }

  setDeleting() {
    this.updateElement({
      ...this._state,
      isDisabled: true,
      isDeleting: true,
    });
  }

  setAborting() {
    this.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
    this.shake();
  }

  removeElement() {
    super.removeElement();
    this.#datepickerFrom = this.#destroyDatepicker(this.#datepickerFrom);
    this.#datepickerTo = this.#destroyDatepicker(this.#datepickerTo);
  }

  reset(point) {
    const allOffersByType = this.#offers.find((o) => o.type === point.type)?.offers || [];
    this.updateElement({
      ...EditEventFormView.parsePointToState(point),
      availableOffers: allOffersByType,
      selectedOfferIds: point.offers.map(String)
    });
  }

  restoreHandlers() {
    this._restoreHandlers();
  }
}
