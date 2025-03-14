import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import ContentList from '../view/content-list.js';
import PointModel from '../model/points-model.js';
import NoPointsView from '../view/no-points-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { FilterType, SortType } from '../const.js';
import { filterFunctions } from '../utils/filter.js';
import { sortFunctions } from '../utils/sort.js';
import PointPresenter from '../presenter/point-presenter.js';

export default class TripPresenter {
  #headerContainer = null;
  #mainContainer = null;
  #controlsFilter = null;
  #pointModel = null;
  #contentList = new ContentList();
  #currentFilter = FilterType.EVERYTHING;
  #currentSort = SortType.DAY;
  #pointPresenters = new Map();

  constructor({ headerContainer, mainContainer, controlsFilter }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#controlsFilter = controlsFilter;
    this.#pointModel = new PointModel();
  }

  init() {
    this.#pointModel.init();
    const points = this.#pointModel.getPoints();
    const destinations = this.#pointModel.getDestinations();
    const activeFilters = {
      [FilterType.EVERYTHING]: points.length > 0,
      [FilterType.FUTURE]: filterFunctions[FilterType.FUTURE](points).length > 0,
      [FilterType.PRESENT]: filterFunctions[FilterType.PRESENT](points).length > 0,
      [FilterType.PAST]: filterFunctions[FilterType.PAST](points).length > 0,
    };

    render(new TripInfoView(points, destinations), this.#headerContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView({ filters: activeFilters, onFilterChange: this.#handleFilterChange }), this.#controlsFilter, RenderPosition.BEFOREEND);
    render(new SortView({ onSortChange: this.#handleSortChange }), this.#mainContainer, RenderPosition.BEFOREEND);
    render(this.#contentList, this.#mainContainer, RenderPosition.BEFOREEND);
    this.#renderPoints();
  }

  #handleFilterChange = (filterType) => {
    this.#currentFilter = filterType;
    this.#renderPoints();
  };

  #handleSortChange = (sortType) => {
    this.#currentSort = sortType;
    this.#renderPoints();
  };

  #applySort(points) {
    return sortFunctions[this.#currentSort](points);
  }

  #renderPoints() {
    this.#clearPoints();
    const points = this.#pointModel.getPoints();
    const filteredPoints = filterFunctions[this.#currentFilter](points);
    const sortedPoints = this.#applySort(filteredPoints);

    if (!sortedPoints.length) {
      render(new NoPointsView(this.#currentFilter), this.#contentList.element, RenderPosition.BEFOREEND);
      return;
    }

    sortedPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      contentList: this.#contentList,
      onDataChange: this.#handlePointChange,
      onFavoriteChange: this.#handleFavoriteChange,
      onResetView: this.#resetAllPointsView
    });

    pointPresenter.init(point, this.#pointModel.getDestinations(), this.#pointModel.getOffers());
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointModel.updatePointFavoriteStatus(updatedPoint);
    this.#renderPoints();
  };

  #handleFavoriteChange = (updatedPoint) => {
    this.#pointModel.updatePointFavoriteStatus(updatedPoint);
    this.#renderPoints();
  };

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #resetAllPointsView = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
