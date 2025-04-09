import TripApiService from './trip-api-service.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';

const AUTHORIZATION = `Basic ${Math.random().toString(36).substring(2, 12)}`;
const ENDPOINT = 'https://23.objects.htmlacademy.pro/big-trip';

const apiService = new TripApiService(ENDPOINT, AUTHORIZATION);
const pointsModel = new PointModel(apiService);
const filterModel = new FilterModel();

const headerElement = document.querySelector('.trip-main');
const mainElement = document.querySelector('.trip-events');
const controlsElement = headerElement.querySelector('.trip-controls__filters');

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

const tripPresenter = new TripPresenter({
  headerContainer: headerElement,
  mainContainer: mainElement,
  pointsModel,
  filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: controlsElement,
  filterModel,
  pointsModel
});

const tripInfoPresenter = new TripInfoPresenter({
  container: headerElement,
  pointsModel
});

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

tripPresenter.setNewPointFormCloseHandler(handleNewPointFormClose);

tripPresenter.init();
tripInfoPresenter.init();
filterPresenter.init();

render(newPointButtonComponent, headerElement);
