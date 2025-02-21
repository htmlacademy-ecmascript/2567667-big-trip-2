import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import EventPointView from '../view/event-point-view.js';
import EditEventFormView from '../view/edit-event-form-view.js';
import TripInfoView from '../view/trip-info-view.js';
import ContentList from '../view/content-list.js';
import { RenderPosition, render } from '../render.js';

export default class TripPresenter {
  constructor({ headerContainer, mainContainer, controlsFilter, pointsModel }) {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
    this.controlsFilter = controlsFilter;
    this.pointsModel = pointsModel;
  }

  init() {
    // Получаем данные из модели
    const points = this.pointsModel.getPoints();

    // Отрисовка информации о маршруте
    render(new TripInfoView(), this.headerContainer, RenderPosition.AFTERBEGIN);

    // Отрисовка фильтров
    render(new FilterView(), this.controlsFilter, RenderPosition.BEFOREEND);

    // Отрисовка сортировки
    render(new SortView(), this.mainContainer, RenderPosition.BEFOREEND);

    // Контейнер для точек маршрута
    const contentList = new ContentList();
    render(contentList, this.mainContainer, RenderPosition.BEFOREEND);

    // Отрисовка всех точек маршрута (и формы редактирования)
    points.forEach((point, index) => {
      this.renderPoint(contentList, point, index === 0); // Первый элемент - форма редактирования
    });
  }

  renderPoint(contentList, point, isEditForm = false) {
    if (isEditForm) {
      // Отрисовываем EditEventFormView для первой точки
      const editFormComponent = new EditEventFormView({
        point,
        offers: this.pointsModel.getOfferByType(point.type),
        destination: this.pointsModel.getDestinationById(point.destination),
      });

      render(editFormComponent, contentList.getElement(), RenderPosition.BEFOREEND);
    }

    // Отрисовываем EventPointView для всех точек
    const pointComponent = new EventPointView({
      point,
      offers: this.pointsModel.getOfferByType(point.type),
      destination: this.pointsModel.getDestinationById(point.destination),
    });

    render(pointComponent, contentList.getElement(), RenderPosition.BEFOREEND);
  }
}
