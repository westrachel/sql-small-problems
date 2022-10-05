document.addEventListener('DOMContentLoaded', () => {
  const contactManager = (() => {
  
    const addContactForm = {
      id: 'add-contact-form',
      title: 'Create Contact',
      fullname: '',
      email: '',
      phone_number: '',
      sales: '',
      marketing: '',
      engineering: '',
      hr: ''
    };
    
    const VALID_IDS = ["fullname", "email", "phone_number", "tag"];
    const editForm = Object.assign({}, addContactForm);
    editForm.title = 'Edit Contact';
    editForm.id = 'edit-contact-form';
    
    const TEMPLATES = {
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
  
      showHide: function(elsToHide, elsToUnhide) {
        elsToHide.forEach(el => {
          if (!el.classList.contains('hide')) {
            el.classList.add('hide');
          }
        });
        
        elsToUnhide.forEach(el => {
          el.classList.remove('hide');
        });
      },

      addHTMLForm: function(formObject) {
        let html = TEMPLATES.form(formObject);
        let parent = document.querySelector('.main-container');
        parent.innerHTML += html;
      },

      init: function() {
        this.addHTMLForm(addContactForm);
        this.addForm = document.querySelector('#add-contact-form');
        this.search = document.querySelector('.search');
        this.addSearchHeader = document.querySelector('.add-search-container');
        this.emptyContacts = document.querySelector('.empty-contacts');
        
        
        this.contactsDiv = document.querySelector('.all-contacts');
        this.allContacts = [];
        this.bindEvents();
      },
    
      createContact: function(form) {
        const contact = { id: generateContactId() };
        return this.editContact(contact, form);
      },
      
      editContact: function(contact, form) {
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

      forms: function() {
        return this.arrify(document.querySelectorAll('form'));
      },
  
      bindEvents: function() {
        const self = this;
        document.addEventListener('click', event => {
          event.preventDefault();
          const target = event.target;

          if (target.className.match('add-contact')) {
            self.showHide([self.addSearchHeader, self.emptyContacts, self.contactsDiv], 
                          [self.addForm]);

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
                  self.showHide([self.forms()], [self.emptyContacts]);
                }
              }
            } else if (editMatch) {
              self.showHide([self.addSearchHeader, self.contactsDiv],
                            []);
              const id = Number(self.anchorContactId(editMatch, target.href));
              const contact = self.allContacts.filter(contact => contact.id === id)[0];
              
              const selectedTags = Object.keys(editForm).filter(key => {
                key.match('(sales|marketing|engineering|hr)');
              });
              selectedTags.forEach(tag => editForm[tag] = '');

              VALID_IDS.forEach(property => {
                if (property !== 'tag') {
                  editForm[property] = "placeholder='" + contact[property] + "'";
                } else {
                  editForm[contact[property]] = "selected";
                }
              });
              
              editForm["idValue"] = `value='${id}'`;
              self.addHTMLForm(editForm);
              self.showHide([], [document.querySelector('#edit-contact-form')]);
            }
          } else if (target.innerHTML.match('Submit')) {
            if (target.form.id === 'add-contact-form') {
              self.allContacts.push(self.createContact(self.addForm));
              self.showHide([self.addForm], []);
          
              let htmlData = TEMPLATES.contacts({ contacts: self.allContacts });
              self.contactsDiv.innerHTML += htmlData;
            } else {
              const id = document.querySelectorAll("input[name='contactId']")[1].value;
              self.allContacts.forEach((contact, idx, arr) => {
                if (String(contact.id) === id) {
                  arr[idx] = self.editContact(contact, target.form);
                }
              });
              
              target.form.remove();
            }
            
            self.showHide([], [self.contactsDiv, self.addSearchHeader]);
          } else if (target.innerHTML.match('Cancel')) {
            const unHideEls = [self.addSearchHeader, self.contactsDiv];
            if (self.allContacts.length === 0) { unHideEls.push(self.emptyContacts); }
            self.showHide(self.forms(), unHideEls);
          }
          
        });
        
        
      }
    };
  })();

  contactManager.init();
});
