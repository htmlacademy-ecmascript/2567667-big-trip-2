import TripApiService from './trip-api-service.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

const AUTHORIZATION = `Basic ${ Math.random().toString(36).substring(2, 12) }`;
const ENDPOINT = 'https://22.objects.htmlacademy.pro/big-trip';

const apiService = new TripApiService(ENDPOINT, AUTHORIZATION);
const pointsModel = new PointsModel(apiService);
const filterModel = new FilterModel();

const headerElement = document.querySelector('.trip-main');
const mainElement = document.querySelector('.trip-events');
const controlsElement = headerElement.querySelector('.trip-controls__filters');
const newEventButton = document.querySelector('.trip-main__event-add-btn');

const tripPresenter = new TripPresenter({
  headerContainer: headerElement,
  mainContainer: mainElement,
  controlsFilter: controlsElement,
  pointsModel,
  filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: controlsElement,
  filterModel,
  pointsModel
});

newEventButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
  newEventButton.disabled = true;
});

tripPresenter.init();
filterPresenter.init();
