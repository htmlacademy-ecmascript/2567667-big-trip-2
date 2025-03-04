import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import EventPointView from '../view/event-point-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import TripInfoView from '../view/trip-info-view.js';
import ContentList from '../view/content-list.js';
import PointModel from '../model/points-model.js';
import { render, RenderPosition } from '../framework/render.js';

export default class TripPresenter {
  #headerContainer = null;
  #mainContainer = null;
  #controlsFilter = null;
  #pointModel = null;

  constructor({ headerContainer, mainContainer, controlsFilter }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#controlsFilter = controlsFilter;
    this.#pointModel = new PointModel();
  }

  init() {
    this.#pointModel.init();
    const points = this.#pointModel.getPoints();
    const offers = this.#pointModel.getOffers();
    const destinations = this.#pointModel.getDestinations();

    // Отрисовка информации о маршруте
    render(new TripInfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);

    // Отрисовка фильтров
    render(new FilterView(), this.#controlsFilter, RenderPosition.BEFOREEND);

    // Отрисовка сортировки
    render(new SortView(), this.#mainContainer, RenderPosition.BEFOREEND);

    const contentList = new ContentList();
    render(contentList, this.#mainContainer, RenderPosition.BEFOREEND);

    // Отрисовка точек маршрута на основе данных из модели
    points.forEach((point) => {
      const destination = destinations.find((dest) => dest.id === point.destination);
      const availableOffers = offers.find((offer) => offer.type === point.type)?.offers || [];

      render(new EventPointView({ point, destination, offers: availableOffers }), contentList.element, RenderPosition.BEFOREEND);
    });

    // Отрисовка формы редактирования
    if (points.length > 0) {
      render(new EditEventFormView({ point: points[0], offers, destinations }), contentList.element, RenderPosition.AFTERBEGIN);
    }
  }
}
