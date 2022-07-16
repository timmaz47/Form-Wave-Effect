class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;

    this._clearSearchInput();

    return query;
  }

  _clearSearchInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

// Not exporting the Class but an Instance (i.e an Object) that was created by the Class
export default new SearchView();
