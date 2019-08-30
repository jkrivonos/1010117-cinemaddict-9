import {AbstractComponent} from "../abstract-component";

export class Wrapper extends AbstractComponent {
  constructor() {
    super();
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `<section class="films">
    
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      
      <div class="films-list__container"></div>
      
      
      <!--<button id="showMore" class="films-list__show-more">Show more</button>-->
     </section>
    
    
    <section class="films-list--extra ">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container" id="toprated"></div>
    </section>
    
    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container" id="commented"></div>
    </section> 
  </section>`;
  }
}