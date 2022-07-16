import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  // Display recipe on page
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = currElements[i];

      // Update any changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update any changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  // Clear recipe section
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // Show a load spinner
  showSpinner() {
    const spinnerMarkup = `
  <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  // Display error msg
  renderError(message = this._errorMessage) {
    const markupError = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markupError);
  }

  renderMessage(message = this._message) {
    const markupMessage = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markupMessage);
  }
}
