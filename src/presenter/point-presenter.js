import { render, replace, remove, RenderPosition } from '../framework/render.js';
import EventPointView from '../view/event-point-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class PointPresenter {
  #contentList = null;
  #point = null;
  #offers = null;
  #destinations = null;
  #onDataChange = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #setActiveEditForm = null;
  #onResetView = null;

  constructor({ contentList, onDataChange, setActiveEditForm, onResetView }) {
    this.#contentList = contentList;
    this.#onDataChange = onDataChange;
    this.#setActiveEditForm = setActiveEditForm;
    this.#onResetView = onResetView;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const allOffersByType = this.#offers.find((offer) => offer.type === this.#point.type)?.offers || [];
    const selectedOffers = allOffersByType.filter((offer) =>
      this.#point.offers.includes(offer.id)
    );

    this.#pointComponent = new EventPointView({
      point: this.#point,
      destination: this.#destinations.find((dest) => dest.id === this.#point.destination),
      offers: selectedOffers,
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
    if (
      !this.#pointComponent?.element?.parentElement ||
      !this.#pointEditComponent
    ) {
      return;
    }

    this.#onResetView?.();

    try {
      replace(this.#pointEditComponent, this.#pointComponent);
    } catch {
      return;
    }

    requestAnimationFrame(() => {
      this.#pointEditComponent.restoreHandlers();
    });

    this.#setActiveEditForm?.(this);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToCard = () => {
    if (
      !this.#pointEditComponent?.element?.parentElement ||
      !this.#pointComponent
    ) {
      return;
    }

    this.#pointEditComponent.reset(this.#point);

    try {
      replace(this.#pointComponent, this.#pointEditComponent);
    } catch {
      return;
    }

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleFormSubmit = async (updatedPoint) => {
    if (updatedPoint.__delete) {
      this.#pointEditComponent?.setDeleting();
      try {
        await this.#onDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, updatedPoint);
        this.destroy();
      } catch {
        this.#pointEditComponent?.setAborting();
      }

      return;
    }

    this.#pointEditComponent?.setSaving();
    try {
      await this.#onDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, updatedPoint);
      this.#replaceFormToCard();
    } catch {
      this.#pointEditComponent?.setAborting();
    }
  };

  #handleFavoriteClick = () => {
    const updatedPoint = { ...this.#point, isFavorite: !this.#point.isFavorite };
    this.#onDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, updatedPoint);
  };

  resetView() {
    if (
      this.#pointEditComponent &&
      this.#contentList.element.contains(this.#pointEditComponent.element)
    ) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  containsForm(component) {
    return this.#pointEditComponent === component;
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }
}
