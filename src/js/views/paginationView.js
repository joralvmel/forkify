import View from './View.js';

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const createButtonMarkup = (type, page) => `
    <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
      ${
        type === 'prev'
          ? `
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${page}</span>
          `
          : `
            <span>${page}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          `
      }
    </button>
  `;
    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return createButtonMarkup('next', currentPage + 1);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return createButtonMarkup('prev', currentPage - 1);
    }

    // Other page
    if (this._data.page < numPages) {
      return `
        ${createButtonMarkup('prev', currentPage - 1)}
        ${createButtonMarkup('next', currentPage + 1)}
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}
export default new PaginationView();
