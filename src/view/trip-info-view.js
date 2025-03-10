import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

function createTripInfoTemplate(points, destinations) {
  if (!points.length) {
    return '<p class="trip-info__title">No trip planned</p>';
  }

  const sortedPoints = [...points].sort((a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom));
  const startPoint = destinations.find((dest) => dest.id === sortedPoints[0].destination)?.name || 'Start';
  const endPoint = destinations.find((dest) => dest.id === sortedPoints[sortedPoints.length - 1].destination)?.name || 'End';
  const totalCost = points.reduce((sum, point) => sum + point.basePrice, 0);

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${startPoint} &mdash; ${endPoint}</h1>
        <p class="trip-info__dates">${dayjs(sortedPoints[0].dateFrom).format('D MMM')} &mdash; ${dayjs(sortedPoints[sortedPoints.length - 1].dateTo).format('D MMM')}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>
  `;
}

export default class TripInfoView extends AbstractView {
  #points = [];
  #destinations = [];

  constructor(points, destinations) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations);
  }
}
