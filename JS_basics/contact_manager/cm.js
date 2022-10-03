document.addEventListener('DOMContentLoaded', () => {
  const contactManager = (() => {
  
    const addContactForm = {
      id: 'add-contact-form',
      title: 'Create Contact',
      name_placeholder: '',
      email_placeholder: '',
      phone_placeholder: '',
      sales_selected: '',
      marketing_selected: '',
      engineering_selected: '',
      hr_selected: ''
    };
    
    const editForm = Object.assign({}, addContactForm);
    editForm.title = 'Edit Contact';
    editForm.id = 'edit-contact-form';
    
    const templates = {
      form: Handlebars.compile(document.querySelector('#contact-form-template').innerHTML),
      contacts: Handlebars.compile(document.querySelector("#contacts-template").innerHTML)
    };
    
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
      
      addInputForm: function() {
        let html = templates.form(addContactForm);
        let parent = document.querySelector('.main-container');
        parent.innerHTML += html;
      },

      init: function() {
        this.addInputForm();
        this.addForm = document.querySelector('#add-contact-form');
        this.search = document.querySelector('.search');
        this.addSearchHeader = document.querySelector('.add-search-container');
        this.emptyContacts = document.querySelector('.empty-contacts');
        
        
        this.divOfContacts = document.querySelector('.all-contacts');
        this.allContacts = [];
        this.bindEvents();
      },
    
      createContact: function(form) {
        const contact = { id: generateContactId() };
        const VALID_IDS = ["fullname", "email", "phone_number", "tag"];

        this.arrify(form).forEach(element => {
          if (VALID_IDS.includes(element.id)) {
            contact[element.name] = element.value;
          }
        });
        return contact;
      },

      anchorContactId: function(match, url) {
        return url.substr(match.index, url.length).split('').filter(char => {
          return char.match('[0-9]');
        }).join();
      },
  
      bindEvents: function() {
        const self = this;
        document.addEventListener('click', event => {
          event.preventDefault();
          const target = event.target;
          
          if (target.className.match('add-contact')) {
            const changeDisplayEls = [self.addSearchHeader, self.addForm, self.emptyContacts];
            changeDisplayEls.forEach(self.toggleDisplay);

          } else if (target.nodeName === 'A') {
            const deleteMatch = target.href.match('delete/');
            const editMatch = target.href.match('edit/');
            
            if (deleteMatch) {
              const confirmed = confirm("Are you sure you want to delete this contact?");
              if (confirmed) {
                const id = Number(self.anchorContactId(deleteMatch, target.href));
                self.allContacts = self.allContacts.filter(contact => contact.id !== id);
                target.parentNode.parentNode.remove();
                
                if (self.allContacts.length === 0) {
                  self.toggleDisplay(self.emptyContacts);
                }
              }
            } else if (editMatch) {
            }
          }
          
        });

        self.addForm.addEventListener('submit', event => {
          event.preventDefault();
          self.allContacts.push(self.createContact(self.addForm));
          [self.addBtns[0], self.search, self.addForm].forEach(self.toggleDisplay);
          
          let htmlData = templates.contacts({ contacts: self.allContacts});
          self.divOfContacts.innerHTML += htmlData;
        });
        
        
      }
    };
  })();

  contactManager.init();
});
