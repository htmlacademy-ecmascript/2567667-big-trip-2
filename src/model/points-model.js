import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { getRandomPoints } from '../mock/points.js';

export default class PointModel {
  #points = [];
  #offers = [];
  #destinations = [];

  init() {
    this.#points = getRandomPoints();
    this.#offers = mockOffers;
    this.#destinations = mockDestinations;
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
}
