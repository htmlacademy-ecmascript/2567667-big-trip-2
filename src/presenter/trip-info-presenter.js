import TripInfoView from '../view/trip-info-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import dayjs from 'dayjs';

export default class TripInfoPresenter {
  #container = null;
  #pointsModel = null;
  #tripInfoComponent = null;

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderTripInfo();
  }

  #handleModelEvent = () => {
    this.#renderTripInfo();
  };

  #renderTripInfo() {
    const points = this.#pointsModel.getPoints();
    const destinations = this.#pointsModel.getDestinations();
    const offers = this.#pointsModel.getOffers();

    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
    }

    if (!points.length) {
      return;
    }

    const sortedPoints = [...points].sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));

    const title = this.#getTripTitle(sortedPoints, destinations);
    const dates = this.#getTripDates(sortedPoints);
    const totalPrice = this.#getTotalPrice(sortedPoints, offers);

    this.#tripInfoComponent = new TripInfoView({ title, dates, totalPrice });
    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #getTripTitle(sortedPoints, destinations) {
    const first = destinations.find((d) => d.id === sortedPoints[0].destination)?.name;
    const last = destinations.find((d) => d.id === sortedPoints[sortedPoints.length - 1].destination)?.name;

    if (!first || !last) {
      return '... — ...';
    }
    return sortedPoints.length <= 3 ? `${first} - ${last}` : `${first} — ... — ${last}`;
  }

  #getTripDates(sortedPoints) {
    const start = dayjs(sortedPoints[0].dateFrom).format('D MMM');
    const end = dayjs(sortedPoints[sortedPoints.length - 1].dateTo).format('D MMM');
    return `${start} — ${end}`;
  }

  #getTotalPrice(points, offersByType) {
    return points.reduce((total, point) => {
      const offerGroup = offersByType.find((group) => group.type === point.type);
      const selectedOffers = offerGroup?.offers.filter((offer) => point.offers.includes(offer.id)) || [];
      const offersSum = selectedOffers.reduce((sum, offer) => sum + offer.price, 0);
      return total + point.basePrice + offersSum;
    }, 0);
  }
}
