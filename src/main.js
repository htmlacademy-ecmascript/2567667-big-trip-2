import TripPresenter from './presenter/trip-presenter.js';

const headerElement = document.querySelector('.trip-main');
const mainElement = document.querySelector('.trip-events');
const controlsElement = headerElement.querySelector('.trip-controls__filters');

const tripPresenter = new TripPresenter({
  headerContainer: headerElement,
  mainContainer: mainElement,
  controlsFilter: controlsElement
});

tripPresenter.init();
