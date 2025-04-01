import FilterView from '../view/filter-view.js';
import { render, replace, remove } from '../framework/render.js';
import { FilterType, UpdateType } from '../const.js';
import { filterFunctions } from '../utils/filter.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #filterComponent = null;

  constructor({ filterContainer, filterModel, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const points = this.#pointsModel.getPoints();

    const activeFilters = {
      [FilterType.EVERYTHING]: points.length > 0,
      [FilterType.FUTURE]: filterFunctions[FilterType.FUTURE](points).length > 0,
      [FilterType.PRESENT]: filterFunctions[FilterType.PRESENT](points).length > 0,
      [FilterType.PAST]: filterFunctions[FilterType.PAST](points).length > 0,
    };

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters: activeFilters,
      currentFilter: this.#filterModel.getFilter(),
      onFilterChange: this.#handleFilterChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
    } else {
      replace(this.#filterComponent, prevFilterComponent);
      remove(prevFilterComponent);
    }
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterChange = (filterType) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
