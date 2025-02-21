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

  getAllOffers() {
    return this.offers.flatMap((offer) => offer.offers);
  }

  getDestinations() {
    return this.destinations;
  }

  getOfferByType(type) {
    return this.offers.find((offer) => offer.type === type)?.offers || [];
  }

  getOfferById(type, itemIds) {
    return this.getOfferByType(type).filter((offer) => itemIds.includes(offer.id));
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id) || null;
  }
}
