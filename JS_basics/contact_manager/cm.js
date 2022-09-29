document.addEventListener('DOMContentLoaded', () => {
  contactManager.init();
});

const contactManager = {
  
  arrify: function(collection) {
    return Array.prototype.slice.call(collection);
  },

  unhideEls: function(...elements) {
    elements.forEach(element => {
      element.classList.remove('hide');
    });
  },

  init: function() {
    this.addContactBtns = this.arrify(document.getElementsByClassName('btn btn-lg btn-outline'));
    this.addContactForm = document.querySelector('#contact-form-info');
  },
  
  bindEvents: function() {
    this.addContactBtns.addEventListener('click', this.unhideEls(this.addContactForm));
  }

};
