import { render, remove, RenderPosition } from '../framework/render.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import { UserAction, UpdateType, BLANK_POINT } from '../const.js';

export default class NewPointPresenter {
  #contentList = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #destinations = [];
  #offers = [];
  #setActiveEditForm = null;

  constructor({ contentList, onDataChange, onDestroy, setActiveEditForm }) {
    this.#contentList = contentList;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#setActiveEditForm = setActiveEditForm;
  }

  init(destinations, offers) {
    this.destroy();

    this.#destinations = destinations;
    this.#offers = offers;

    const initialPoint = {
      ...BLANK_POINT,
      dateFrom: null,
      dateTo: null,
      destination: null
    };

    this.#pointEditComponent = new EditEventFormView({
      point: {
        ...initialPoint,
        isCreating: true
      },
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onEditClose: this.#handleCancelClick
    });

    render(this.#pointEditComponent, this.#contentList.element, RenderPosition.AFTERBEGIN);

    requestAnimationFrame(() => {
      this.#pointEditComponent.restoreHandlers();
    });
    this.#setActiveEditForm?.(this.#pointEditComponent);
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
    this.#setActiveEditForm?.(null);
    this.#handleDestroy?.();
  }

  #handleFormSubmit = async (point) => {
    this.#pointEditComponent?.setSaving();

    try {
      await this.#handleDataChange(UserAction.ADD_POINT, UpdateType.MAJOR, point);
      this.destroy();
    } catch {
      this.#pointEditComponent?.setAborting();
    }
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
