import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import EventPointView from '../view/event-point-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import TripInfoView from '../view/trip-info-view.js';
import ContentList from '../view/content-list.js';
import PointModel from '../model/points-model.js';
import NoPointsView from '../view/no-points-view.js';
import { render, replace, RenderPosition } from '../framework/render.js';
import { FilterType } from '../const.js';
import dayjs from 'dayjs';

export default class TripPresenter {
  #headerContainer = null;
  #mainContainer = null;
  #controlsFilter = null;
  #pointModel = null;
  #contentList = new ContentList();

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
    render(new FilterView(activeFilters), this.#controlsFilter, RenderPosition.BEFOREEND);
    render(new SortView(), this.#mainContainer, RenderPosition.BEFOREEND);
    render(this.#contentList, this.#mainContainer, RenderPosition.BEFOREEND);

    if (!points.length) {
      render(new NoPointsView (FilterType.EVERYTHING), this.#contentList.element, RenderPosition.BEFOREEND);
      return;
    }

    points.forEach((point) => this.#renderPoint(point));
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
      onEditClick: replaceCardToForm
    });

    const pointEditComponent = new EditEventFormView({
      point,
      offers,
      destinations,
      onFormSubmit: replaceFormToCard,
      onEditClose: replaceFormToCard
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
