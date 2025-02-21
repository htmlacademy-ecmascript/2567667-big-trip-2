import { mockPoints } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';
import { mockDestinations } from '../mock/destinations.js';

export default class PointsModel {
  constructor() {
    this.points = mockPoints;
    this.offers = mockOffers;
    this.destinations = mockDestinations;
  }

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }

  getOfferByType(type) {
    return this.offers.find((offer) => offer.type === type)?.offers || [];
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id) || null;
  }
}
