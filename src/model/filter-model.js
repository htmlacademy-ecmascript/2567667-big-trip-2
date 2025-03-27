import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';

export default class FilterModel extends Observable {
  #currentFilter = FilterType.EVERYTHING;

  getFilter() {
    return this.#currentFilter;
  }

  setFilter(updateType, newFilter) {
    if (this.#currentFilter === newFilter) {
      return;
    }

    this.#currentFilter = newFilter;
    this._notify(updateType, newFilter);
  }
}
