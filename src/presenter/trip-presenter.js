import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import EventPointView from '../view/event-point-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import TripInfoView from '../view/trip-info-view.js';
import ContentList from '../view/content-list.js';
import PointModel from '../model/points-model.js';
import NoPointsView from '../view/no-points-view.js';
import { render, replace, RenderPosition } from '../framework/render.js';
import { FilterType, SortType } from '../const.js';
import dayjs from 'dayjs';
import { filterFunctions } from '../utils/filter.js';
import { sortFunctions } from '../utils/sort.js';

export default class TripPresenter {
  #headerContainer = null;
  #mainContainer = null;
  #controlsFilter = null;
  #pointModel = null;
  #contentList = new ContentList();
  #currentFilter = FilterType.EVERYTHING; // Текущий выбранный фильтр
  #currentSort = SortType.DAY; // Текущая сортировка

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

    // Определяем, какие фильтры активны
    const activeFilters = {
      [FilterType.EVERYTHING]: points.length > 0,
      [FilterType.FUTURE]: points.some((point) => dayjs(point.dateFrom).isAfter(dayjs())),
      [FilterType.PRESENT]: points.some((point) => dayjs(point.dateFrom).isBefore(dayjs()) && dayjs(point.dateTo).isAfter(dayjs())),
      [FilterType.PAST]: points.some((point) => dayjs(point.dateTo).isBefore(dayjs())),
    };

    render(new TripInfoView(points, destinations), this.#headerContainer, RenderPosition.AFTERBEGIN);

    render(new FilterView({
      filters: activeFilters,
      onFilterChange: this.#handleFilterChange,
    }), this.#controlsFilter, RenderPosition.BEFOREEND);

    render(new SortView({
      onSortChange: this.#handleSortChange,
    }), this.#mainContainer, RenderPosition.BEFOREEND);

    render(this.#contentList, this.#mainContainer, RenderPosition.BEFOREEND);

    this.#renderPoints(); // Рендерим точки с учетом текущего фильтра и сортировки
  }

  #handleFilterChange = (filterType) => {
    this.#currentFilter = filterType;
    this.#renderPoints(); // Обновляем список точек при изменении фильтра
  };

  #handleSortChange = (sortType) => {
    this.#currentSort = sortType;
    this.#renderPoints(); // Обновляем список точек при изменении сортировки
  };

  #applySort(points) {
    return sortFunctions[this.#currentSort](points); // Применяем сортировку
  }

  #renderPoints() {
    const points = this.#pointModel.getPoints();
    const filteredPoints = filterFunctions[this.#currentFilter](points); // Фильтруем точки
    const sortedPoints = this.#applySort(filteredPoints); // Применяем сортировку

    this.#contentList.element.innerHTML = ''; // Очищаем список

    if (!sortedPoints.length) {
      render(new NoPointsView(this.#currentFilter), this.#contentList.element, RenderPosition.BEFOREEND);
      return;
    }

    sortedPoints.forEach((point) => this.#renderPoint(point)); // Рендерим отсортированные точки
  }

  #renderPoint(point) {
    const destinations = this.#pointModel.getDestinations();
    const offers = this.#pointModel.getOffers();
    const destination = destinations.find((dest) => dest.id === point.destination);
    const availableOffers = offers.find((offer) => offer.type === point.type)?.offers || [];

    const pointComponent = new EventPointView({
      point,
      destination,
      offers: availableOffers,
      onEditClick: replaceCardToForm,
    });

    const pointEditComponent = new EditEventFormView({
      point,
      offers,
      destinations,
      onFormSubmit: replaceFormToCard,
      onEditClose: replaceFormToCard,
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function escKeyDownHandler(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
      }
    }

    render(pointComponent, this.#contentList.element, RenderPosition.BEFOREEND);
  }
}
