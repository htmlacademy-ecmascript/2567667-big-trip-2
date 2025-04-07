import SortView from '../view/sort-view.js';
import ContentList from '../view/content-list.js';
import NoPointsView from '../view/no-points-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, FilterType, UpdateType, UserAction } from '../const.js';
import { filterFunctions } from '../utils/filter.js';
import { sortFunctions } from '../utils/sort.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import FailedLoadingView from '../view/failed-load-data-view.js';

export default class TripPresenter {
  #newPointPresenter = null;
  #headerContainer = null;
  #mainContainer = null;
  #pointModel = null;
  #filterModel = null;
  #sortComponent = null;
  #contentList = new ContentList();
  #currentSort = SortType.DAY;
  #pointPresenters = new Map();
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #onNewPointFormClose = null;
  #activePresenter = null;
  #noPointsComponent = null;
  #failedLoadingComponent = null;

  constructor({ headerContainer, mainContainer, pointsModel, filterModel }) {
    this.#newPointPresenter = new NewPointPresenter({
      contentList: this.#contentList,
      onDataChange: this.#handleUserAction,
      onDestroy: this.#handleNewPointFormClose
    });

    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#pointModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  setNewPointFormCloseHandler(callback) {
    this.#onNewPointFormClose = callback;
  }

  init() {
    render(this.#loadingComponent, this.#mainContainer, RenderPosition.BEFOREEND);
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
        this.#isLoading = false;
        remove(this.#loadingComponent);

        if (this.#pointModel.hasError()) {
          this.#renderFailedLoading();
          return;
        }

        this.#renderBoard();
        break;
    }
  };

  #renderFailedLoading() {
    this.#failedLoadingComponent = new FailedLoadingView();
    render(this.#failedLoadingComponent, this.#mainContainer, RenderPosition.BEFOREEND);
  }

  #handleUserAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        return this.#pointModel.updatePoint(updateType, update);
      case UserAction.ADD_POINT:
        return this.#pointModel.addPoint(updateType, update);
      case UserAction.DELETE_POINT:
        return this.#pointModel.deletePoint(updateType, update);
    }
  };

  #renderBoard() {
    if (this.#isLoading) {
      return;
    }

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

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
      this.#noPointsComponent = null;
    }

    if (!sortedPoints.length) {
      if (this.#sortComponent) {
        remove(this.#sortComponent);
        this.#sortComponent = null;
      }

      this.#noPointsComponent = new NoPointsView(filterType);
      render(this.#noPointsComponent, this.#mainContainer, RenderPosition.BEFOREEND);
      return;
    }

    sortedPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      contentList: this.#contentList,
      onDataChange: this.#handleUserAction,
      onResetView: this.#resetAllPointsView,
      setActiveEditForm: this.setActiveEditForm.bind(this)
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
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
      this.#noPointsComponent = null;
    }
  }

  createPoint() {
    if (this.#newPointPresenter.isActive()) {
      return;
    }

    this.#resetAllPointsView();
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#handleModelEvent(UpdateType.MAJOR);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
      this.#noPointsComponent = null;
    }

    this.#newPointPresenter.init(
      this.#pointModel.getDestinations(),
      this.#pointModel.getOffers()
    );
  }

  setActiveEditForm(presenter) {
    if (this.#activePresenter && this.#activePresenter !== presenter) {
      this.#activePresenter.resetView();
    }

    this.#activePresenter = presenter;
  }

  #handleNewPointFormClose = () => {
    this.#newPointPresenter.destroy();
    this.#onNewPointFormClose?.();

    const points = this.#pointModel.getPoints();
    const filteredPoints = filterFunctions[this.#filterModel.getFilter()](points);

    if (filteredPoints.length === 0 && !this.#noPointsComponent) {
      this.#noPointsComponent = new NoPointsView(this.#filterModel.getFilter());
      render(this.#noPointsComponent, this.#mainContainer, RenderPosition.BEFOREEND);
    }
  };

  #resetAllPointsView = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };
}
