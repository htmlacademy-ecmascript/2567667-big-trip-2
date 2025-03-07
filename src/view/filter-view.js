import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate(filters) {
  return `
    <form class="trip-filters" action="#" method="get">
      ${Object.entries(filters).map(([filterType, isEnabled]) => `
        <div class="trip-filters__filter">
          <input id="filter-${filterType}" class="trip-filters__filter-input visually-hidden"
            type="radio" name="trip-filter" value="${filterType}" ${!isEnabled ? 'disabled' : ''}>
          <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
        </div>
      `).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
}

export default class FilterView extends AbstractView {
  #filters = {};

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
