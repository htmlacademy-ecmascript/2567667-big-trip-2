import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

const headerElement = document.querySelector('.trip-main');
const mainElement = document.querySelector('.trip-events');
const controlsElement = headerElement.querySelector('.trip-controls__filters');
const newEventButton = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

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
