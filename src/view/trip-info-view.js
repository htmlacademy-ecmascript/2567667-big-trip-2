import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

function createTripInfoTemplate(points, destinations, offersByType) {
  if (!points.length) {
    return '<p class="trip-info__title">No trip planned</p>';
  }

  const sortedPoints = [...points].sort((a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom));
  const startDate = sortedPoints[0].dateFrom;
  const endDate = sortedPoints[sortedPoints.length - 1].dateTo;

  const cities = sortedPoints.map((point) => {
    const destination = destinations.find((dest) => dest.id === point.destination);
    return destination?.name || '';
  });

  let routeTitle = '';
  if (cities.length <= 3) {
    routeTitle = cities.join(' — ');
  } else {
    routeTitle = `${cities[0]} — … — ${cities[cities.length - 1]}`;
  }

  const totalCost = sortedPoints.reduce((sum, point) => {
    const offerGroup = offersByType.find((offer) => offer.type === point.type);
    const selectedOffers = offerGroup
      ? offerGroup.offers.filter((offer) => point.offers.includes(offer.id))
      : [];
    const offersTotal = selectedOffers.reduce((acc, offer) => acc + offer.price, 0);
    return sum + point.basePrice + offersTotal;
  }, 0);

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${routeTitle}</h1>
        <p class="trip-info__dates">${dayjs(startDate).format('D MMM')} &mdash; ${dayjs(endDate).format('D MMM')}</p>
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
  #offers = [];

  constructor(points, destinations, offers) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
