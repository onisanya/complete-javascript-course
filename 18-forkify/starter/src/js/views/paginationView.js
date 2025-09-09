import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      if (!btn) return;

      console.log(+btn.dataset.goto);
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    // calculate number of pages
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const curPage = this._data.page;

    console.log(`numPages = ${numPages}`);

    // page 0
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
         <div class="pagination__page">Page ${curPage} of ${numPages}</div>
        `;
    }
    //  last page
    if (numPages > 1 && curPage === numPages) {
      return `
       <div class="pagination__page" display = "inline">Page ${curPage} of ${numPages}</div>
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage - 1}</span>
        </button>`;
    }

    // page 0 is last
    if (curPage === numPages && numPages > 1) {
      return ` <div class="pagination__page">Page ${curPage} of ${numPages}</div>`;
    }
    // between
    if (curPage < numPages && curPage > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage - 1}</span>
        </button>
        <div class="pagination__page">Page ${curPage} of ${numPages}</div>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
    }
  }
}
export default new PaginationView();
