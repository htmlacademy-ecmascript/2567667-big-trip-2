import { createElement } from '../render.js';

function createContentListTemplate(){
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
}

export default class ContentList {
  getTemplate() {
    return createContentListTemplate();
  }

  getElement() {
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }

}
