document.addEventListener('DOMContentLoaded', () => {
  const contactManager = (() => {
  
    let contactId = 0;
    function generateContactId() {
      return contactId += 1;
    }
  
    return {
      arrify: function(collection) {
        return Array.prototype.slice.call(collection);
      },
  
      toggleDisplay: function(element) {
        element.classList.toggle('hide');
      },

      init: function() {
        this.addBtns = this.arrify(document.getElementsByClassName('add-contacts'));
        this.addForm = document.querySelector('#add-contact-form');
        this.search = document.querySelector('.search');
        this.cancelBtns = this.arrify(document.querySelectorAll('.cancel-button'));
        this.emptyContacts = document.querySelector('.empty-contacts');
        this.contactsTemplate = Handlebars.compile(document.querySelector("#contactsTemplate").innerHTML);
        this.allContacts = [];
        this.bindEvents();
      },
    
      createContact: function(form) {
        const contact = { id: generateContactId() };
        const VALID_IDS = ["fullname", "email", "phone_number", "tag"];

        console.log(this.arrify(form));
        this.arrify(form).forEach(element => {
          if (VALID_IDS.includes(element.id)) {
            contact[element.name] = element.value;
          }
        });
        return contact;
      },
  
      bindEvents: function() {
        let self = this;
        let btns = self.addBtns.concat(self.cancelBtns);
        let addSearchEls = self.addBtns.concat([self.addForm, self.search, self.emptyContacts]);

        btns.forEach(element => {
          element.addEventListener('click', event => {
            event.preventDefault();
            addSearchEls.forEach(self.toggleDisplay);
          });
        });

        self.addForm.addEventListener('submit', event => {
          event.preventDefault();
          self.allContacts.push(self.createContact(self.addForm));
          [self.addBtns[0], self.search, self.addForm].forEach(self.toggleDisplay);
          
          let htmlData = self.contactsTemplate({ contacts: self.allContacts});
          debugger;
          document.querySelector('.all-contacts').innerHTML += htmlData;
        });
      }
    };
  })();

  contactManager.init();
});