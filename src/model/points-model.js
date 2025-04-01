import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { getRandomPoints } from '../mock/points.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #points = [];
  #offers = [];
  #destinations = [];

  constructor() {
    super();
  }

  init() {
    this.#points = getRandomPoints();
    this.#offers = mockOffers;
    this.#destinations = mockDestinations;
    this._notify('INIT');
  }

  getPoints() {
    return this.#points;
  }

  getOffers() {
    return this.#offers;
  }

  getDestinations() {
    return this.#destinations;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, newPoint) {
    this.#points = [newPoint, ...this.#points];
    this._notify(updateType, newPoint);
  }

  deletePoint(updateType, pointToDelete) {
    const index = this.#points.findIndex((point) => point.id === pointToDelete.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
