import PointsModel from './model/points-model.js';
import TripPresenter from './presenter/trip-presenter.js';

const headerElement = document.querySelector('.trip-main');
const mainElement = document.querySelector('.trip-events');
const controlsElement = headerElement.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();

const tripPresenter = new TripPresenter({
  headerContainer: headerElement,
  mainContainer: mainElement,
  controlsFilter: controlsElement,
  pointsModel,
});

tripPresenter.init();
