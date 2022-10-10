import { createContact } from './contact.js';
import { domManager } from './dom_manager.js';
import { requestManager } from './request_manager.js';
import { createForm } from './form.js';


const ContactManager = (() => {
  const dom = domManager();
  const requester = requestManager();
   
  return {
    init() {
      dom.addHTMLForm(createForm('add-contact-form', 'Create Contact'));
      dom.selectors.addForm = '#add-contact-form';
      this.bindEvents();
    },
    
    processClick(target) {
      if (target.className.match('add-contact')) {
        dom.displayAddForm();

      } else if (target.nodeName === 'A') {
        dom.editOrDeleteContact(target);
              
      } else if (target.innerHTML.match('Submit')) {
        dom.submitForm(target);
            
      } else if (target.innerHTML.match('Cancel')) {
        dom.updateDisplayToCancel();
      }
    },

    bindEvents() {
      const self = this;
      document.addEventListener('click', event => {
        event.preventDefault();
        self.processClick(event.target);
      });
      
      //document.addEventListener('keyup', event => {
      //  alert('have not built out search field listener');
      //});
    },
    
  };

})();


document.addEventListener('DOMContentLoaded', () => {
  ContactManager.init();
});