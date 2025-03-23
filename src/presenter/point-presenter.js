import { render, replace, remove, RenderPosition } from '../framework/render.js';
import EventPointView from '../view/event-point-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';

export default class PointPresenter {
  #contentList = null;
  #point = null;
  #offers = null;
  #destinations = null;
  #onDataChange = null;
  #onFavoriteChange = null;
  #onResetView = null;
  #pointComponent = null;
  #pointEditComponent = null;

  constructor({ contentList, onDataChange, onFavoriteChange, onResetView }) {
    this.#contentList = contentList;
    this.#onDataChange = onDataChange;
    this.#onFavoriteChange = onFavoriteChange;
    this.#onResetView = onResetView;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#pointComponent = new EventPointView({
      point: this.#point,
      destination: this.#destinations.find((dest) => dest.id === this.#point.destination),
      offers: this.#offers.find((offer) => offer.type === this.#point.type)?.offers || [],
      onEditClick: this.#replaceCardToForm,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#pointEditComponent = new EditEventFormView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onEditClose: this.#replaceFormToCard
    });

    render(this.#pointComponent, this.#contentList.element, RenderPosition.BEFOREEND);
  }

  #replaceCardToForm = () => {
    this.#onResetView();
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleFormSubmit = (updatedPoint) => {
    this.#replaceFormToCard();
    this.#onDataChange(updatedPoint);
  };

  #handleFavoriteClick = () => {
    const updatedPoint = { ...this.#point, isFavorite: !this.#point.isFavorite };
    this.#onFavoriteChange(updatedPoint);
  };

  resetView() {
    if (this.#pointEditComponent && this.#contentList.element.contains(this.#pointEditComponent.element)) {
      this.#replaceFormToCard();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }
}
