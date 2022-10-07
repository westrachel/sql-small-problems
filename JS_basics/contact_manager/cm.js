document.addEventListener('DOMContentLoaded', () => {
  const contactManager = (() => {
    
    function find(selector) {
      return document.querySelector(selector);
    }
    
    const DOM = {
      addForm: find('#add-contact-form'),
      search: find('.search'),
      addSearchHeader: find('.add-search-container'),
      noContacts: find('.empty-contacts'),
      contactsDiv: find('.all-contacts')
    };
    
    const DANGER_CHARS_ENCODING = {
      '&': '&amp',
      '>': '&lt',
      '<': '&gt',
      '"': '&quot',
      "'": '&#x27',
    };
    
    const FORM_INPUT_REGEX = {
     'fullname': ['[A-Za-z]{1,}', 'Fullname must have >= 1 alphabetical character'],
     'email': ['[A-Za-z]{1,}@[A-Za-z]{1,}\.[A-Za-z]{2,}', 
               "Ensure there's a leading name, an @, and an extension in the email"],
     'phone_number': ['[0-9]{3}-[0-9]{3}-[0-9]{4}',
                      "Phone number should have 10 digits & appropriate hyphens (ex: 222-222-2222)"]
    };

    const addContactProps = {
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
    
    const VALID_IDS = Object.keys(FORM_INPUT_REGEX).concat("tag");
    const editForm = Object.assign({}, addContactProps);
    editForm.title = 'Edit Contact';
    editForm.id = 'edit-contact-form';
    
    const TEMPLATES = {
      form: Handlebars.compile(find('#contact-form-template').innerHTML),
      contacts: Handlebars.compile(find("#contacts-template").innerHTML)
    };
    
    let contactId = 0;
    function generateContactId() {
      return contactId += 1;
    }
  
    return {
      arrify: function(collection) {
        return Array.prototype.slice.call(collection);
      },
  
      addClass: function(...classElements) {
        const cssClass = classElements[0];
        classElements.slice(1).forEach(el => {
          el.classList.add(cssClass);
        });
      },
      
      removeClass: function(...classElements) {
        const cssClass = classElements[0];
        classElements.slice(1).forEach(el => {
          if (el.classList.contains(cssClass)) {
            el.classList.remove(cssClass);
          }
        });
      },
  
      addHTMLForm: function(formObject) {
        let html = TEMPLATES.form(formObject);
        let parent = find('.main-container');
        parent.innerHTML += html;
      },

      init: function() {
        this.addHTMLForm(addContactProps);
        this.allContacts = [];
        this.bindEvents();
      },
    
      createContact: function(form) {
        const contact = { id: generateContactId() };
        return this.editContact(contact, form, this);
      },
      
      editContact: function(contact, form, self) {
        self.arrify(form).forEach(element => {
          if (VALID_IDS.includes(element.id)) {
            contact[element.name] = self.encodeDangerChars(element.value);
          }
        });
        
        return contact;
      },
      
      encodeDangerChars: function(string) {
        return string.split('').map(char => {
          if (Object.keys(DANGER_CHARS_ENCODING).includes(char)) {
            return DANGER_CHARS_ENCODING[char];
          } else {
            return char;
          }
        }).join('');
      },
      
      validContactInput: function(form) {
        let allValid = true;

        this.arrify(form.querySelectorAll('input')).forEach(el => {
          let regex_error_msg = FORM_INPUT_REGEX[el.id];
          
          if (regex_error_msg) {
            if (!el.value.match(regex_error_msg[0])) {
              alert(regex_error_msg[1]);
              allValid = false;
            }
          }
        });
        
        return allValid;
      },

      anchorContactId: function(match, url) {
        return url.substr(match.index, url.length).split('').filter(char => {
          return char.match('[0-9]');
        }).join();
      },

      forms: function() {
        return this.arrify(document.querySelectorAll('form'));
      },
      
      addContactsHTML: function(context) {
        this.contactsDiv().remove();
        let htmlData = TEMPLATES.contacts({ contacts: context.allContacts });
        let contactsContainer = find('.contacts-container');
        contactsContainer.innerHTML += htmlData;
      },
  
      bindEvents: function() {
        const self = this;
        document.addEventListener('click', event => {
          event.preventDefault();
          const target = event.target;

          if (target.className.match('add-contact')) {
            self.addClass('hide', DOM.addSearchHeader, DOM.noContacts, DOM.contactsDiv);
            self.removeClass('hide', DOM.addForm);

          } else if (target.nodeName === 'A') {
            const deleteMatch = target.href.match('delete/');
            const editMatch = target.href.match('edit/');
            
            if (deleteMatch) {
              const confirmed = confirm("Are you sure you want to delete this contact?");
              if (confirmed) {
                const id = Number(self.anchorContactId(deleteMatch, target.href));
                self.allContacts = self.allContacts.filter(contact => contact.id !== id);
                target.parentNode.parentNode.remove();
                
                debugger;
                console.log(self.allContacts.length === 0);
                if (self.allContacts.length === 0) {
                  self.removeClass('hide', DOM.noContacts);
                  //noContacts.classList.remove('hide');
                }
              }
            } else if (editMatch) {
              self.addClass('hide', DOM.addSearchHeader);
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
              self.removeClass('hide', find('#edit-contact-form'));
            }
          } else if (target.innerHTML.match('Submit')) {
            const form = target.closest("form");
            if (self.validContactInput(form)){
              if (target.form.id === 'add-contact-form') {
                self.allContacts.push(self.createContact(DOM.addForm));
                self.addClass('hide', DOM.addForm);
          
              } else {
                const id = document.querySelectorAll("input[name='contactId']")[1].value;
                self.allContacts.forEach((contact, idx, arr) => {
                  if (String(contact.id) === id) {
                    arr[idx] = self.editContact(contact, target.form, self);
                  }
                });
            
                target.form.remove();
            }
            
              self.addContactsHTML(self);
              self.removeClass('hide', DOM.addSearchHeader);
            }
            
          } else if (target.innerHTML.match('Cancel')) {
            const unHideEls = [DOM.addSearchHeader, DOM.contactsDiv];
            if (self.allContacts.length === 0) { 
              unHideEls.push(self.emptyContacts); 
            }
            self.addClass('hide', self.forms());
            self.removeClass('hide', unHideEls);
          }
          
        });
        
        
      }
    };
  })();

  contactManager.init();
});
