import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import ContentList from '../view/content-list.js';
import NoPointsView from '../view/no-points-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { filterFunctions } from '../utils/filter.js';
import { sortFunctions } from '../utils/sort.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #headerContainer = null;
  #mainContainer = null;
  #controlsFilter = null;
  #pointModel = null;
  #filterModel = null;
  #sortComponent = null;
  #contentList = new ContentList();
  #currentSort = SortType.DAY;
  #pointPresenters = new Map();

  constructor({ headerContainer, mainContainer, controlsFilter, pointsModel, filterModel }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#controlsFilter = controlsFilter;
    this.#pointModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#pointModel.init();
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id)?.init(
          data,
          this.#pointModel.getDestinations(),
          this.#pointModel.getOffers()
        );
        break;

      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderPoints();
        break;

      case UpdateType.MAJOR:
        this.#clearPoints({ resetSortType: true });
        this.#renderSort();
        this.#renderPoints();
        break;

      case UpdateType.INIT:
        this.#renderBoard();
        break;
    }
  };

  #handleUserAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #renderBoard() {
    const points = this.#pointModel.getPoints();
    const destinations = this.#pointModel.getDestinations();

    render(new TripInfoView(points, destinations), this.#headerContainer, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    render(this.#contentList, this.#mainContainer, RenderPosition.BEFOREEND);
    this.#renderPoints();
  }

  #renderSort() {
    if (this.#sortComponent !== null) {
      remove(this.#sortComponent);
    }

    this.#sortComponent = new SortView({
      currentSortType: this.#currentSort,
      onSortChange: this.#handleSortChange
    });

    render(this.#sortComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #handleSortChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }
    this.#currentSort = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };

  #applySort(points) {
    return sortFunctions[this.#currentSort](points);
  }

  #renderPoints() {
    const filterType = this.#filterModel.getFilter();
    const points = this.#pointModel.getPoints();
    const filteredPoints = filterFunctions[filterType](points);
    const sortedPoints = this.#applySort(filteredPoints);

    if (!sortedPoints.length) {
      render(new NoPointsView(filterType), this.#contentList.element, RenderPosition.BEFOREEND);
      return;
    }

    sortedPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      contentList: this.#contentList,
      onDataChange: this.#handleUserAction,
      onResetView: this.#resetAllPointsView
    });

    pointPresenter.init(point, this.#pointModel.getDestinations(), this.#pointModel.getOffers());
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPoints({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#contentList.element.innerHTML = '';
    if (resetSortType) {
      this.#currentSort = SortType.DAY;
    }
  }

  #resetAllPointsView = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
