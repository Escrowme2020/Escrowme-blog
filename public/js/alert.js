const hideAlert = () => {
  const el = document.querySelector('.alert');
  if(el) el.parentElement.removeChild(el);
};


const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert ${type}">${msg} <i class="fas fa-check-circle"></i></div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};