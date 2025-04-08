import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { ErrorCodes } from '../const.js';

export default class PointModel extends Observable {
  #points = [];
  #offers = [];
  #destinations = [];
  #api = null;
  #hasError = false;

  constructor(apiService) {
    super();
    this.#api = apiService;
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

  hasError() {
    return this.#hasError;
  }

  async init() {
    try {
      const [points, offers, destinations] = await Promise.all([
        this.#api.points,
        this.#api.offers,
        this.#api.destinations,
      ]);

      this.#points = points.map(this.#adaptToClient);
      this.#offers = offers;
      this.#destinations = destinations;
      this.#hasError = false;

    } catch (err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
      this.#hasError = true;
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#api.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);

    } catch (err) {
      throw new Error(ErrorCodes.UPDATE_POINT_FAILED);
    }
  }

  async addPoint(updateType, newPoint) {
    try {
      const response = await this.#api.addPoint(newPoint);
      const addedPoint = this.#adaptToClient(response);
      this.#points = [addedPoint, ...this.#points];
      this._notify(updateType, addedPoint);
    } catch (err) {
      throw new Error(ErrorCodes.ADD_POINT_FAILED);
    }
  }

  async deletePoint(updateType, pointToDelete) {
    const index = this.#points.findIndex((point) => point.id === pointToDelete.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }
    try {
      await this.#api.deletePoint(pointToDelete);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, pointToDelete);
    } catch (err) {
      throw new Error(ErrorCodes.DELETE_POINT_FAILED);
    }
  }

  #adaptToClient(point) {
    return {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };
  }
}
