import AbstractView from '../framework/view/abstract-view.js';

function createContentListTemplate(){
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
}
export default class ContentList extends AbstractView {
  get template() {
    return createContentListTemplate();
  }
}
