import { render, remove, RenderPosition } from '../framework/render.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import { UserAction, UpdateType } from '../const.js';

const { AFTERBEGIN } = RenderPosition;

export default class NewPointPresenter {
  #contentList = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #destinations = [];
  #offers = [];

  constructor({ contentList, onDataChange, onDestroy }) {
    this.#contentList = contentList;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, offers) {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#destinations = destinations;
    this.#offers = offers;

    this.#pointEditComponent = new EditEventFormView({
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onEditClose: this.#handleCancelClick,
      isNew: true
    });

    render(this.#pointEditComponent, this.#contentList.element, AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  isActive() {
    return this.#pointEditComponent !== null;
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleDestroy?.();
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
