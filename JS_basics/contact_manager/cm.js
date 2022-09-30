document.addEventListener('DOMContentLoaded', () => {
  contactManager.init();
});

const contactManager = {
  arrify: function(collection) {
    return Array.prototype.slice.call(collection);
  },

  setDisplayStatus: function(...statusAndEls) {
    const display = statusAndEls[0];
    const els = statusAndEls.slice(1);
  
    els.forEach(element => {
      if (display === 'hide') {
        element.classList.add('hide');
      } else {
        element.classList.remove('hide');
      }
    });
  },

  changeAddFormDisplay: function(showForm) {
    const formStatus = showForm === 'unhide' ? 'unhide' : 'hide';
    const addBtnsStatus = showForm === 'unhide' ? 'hide' : 'unhide';

    this.setDisplayStatus(formStatus, this.addContactForm);
    this.setDisplayStatus(addBtnsStatus, this.addContactBtns, this.searchField);
  },

  init: function() {
    this.addContactBtns = this.arrify(document.getElementsByClassName('btn btn-lg btn-outline'));
    this.addContactForm = document.querySelector('#contact-form-info');
    this.searchField = document.querySelector('.search')
    this.cancelBtn = document.querySelector('button');
    this.bindEvents();
  },
  
  bindEvents: function() {
    let self = this;
    self.addContactBtns.forEach(button => {
      addEventListener('click', () => {
        self.changeAddFormDisplay('unhide');
      });
    });
    
    self.cancelBtn.addEventListener('click', () => {
      alert('hide form!');
      self.changeAddFormDisplay('hide');
    });
  }

};