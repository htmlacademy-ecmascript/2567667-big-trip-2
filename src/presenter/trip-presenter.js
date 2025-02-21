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
    // const points = this.pointsModel.getPoints();
    // render (points, this.pointsModel, RenderPosition.AFTERBEGIN);

    // Отрисовка информации о маршруте
    render(new TripInfoView(), this.headerContainer, RenderPosition.AFTERBEGIN);

    // Отрисовка фильтров
    render(new FilterView(), this.controlsFilter, RenderPosition.BEFOREEND);

    // Отрисовка сортировки
    render(new SortView(), this.mainContainer, RenderPosition.BEFOREEND);

    const contentList = new ContentList();

    render(contentList, this.mainContainer, RenderPosition.BEFOREEND);

    // Отрисовка 3 точек маршрута
    for (let i = 0; i < 3; i++) {
      render(new EventPointView(), contentList.getElement(), RenderPosition.BEFOREEND);
    }

    // Отрисовка формы редактирования
    render(new EditEventFormView(), contentList.getElement(), RenderPosition.AFTERBEGIN);
  }
}
