const DomManager = {
  
  allContacts: [], 
  
  find(selector) {
    return document.querySelector(selector);
  },
  
  findAll(selector) {
    let items = document.querySelectorAll(selector);
    return this.arrify(items);
  },
  
  arrify(collection) {
    return Array.prototype.slice.call(collection);
  },
  
  template(id) {
    return Handlebars.compile(this.find(id).innerHTML);
  },
  
  renderHandlebarsHTML(id, data) {
    let renderAsHTML = this.template(id);
    return renderAsHTML(data);
  },
  
  anchorContactId(match, url) {
    return url.substr(match.index, url.length).split('').filter(char => {
      return char.match('[0-9]');
    }).join('');
  },

  addClass(...classSelectors) {
    const cssClass = classSelectors[0];
    classSelectors.slice(1).forEach(selector => {
      this.find(selector).classList.add(cssClass);
    });
  },
      
  removeClass(...classSelectors) {
    const cssClass = classSelectors[0];
    classSelectors.slice(1).forEach(selector => {
      const el = this.find(selector);
      if (el.classList.contains(cssClass)) {
        el.classList.remove(cssClass);
      }
    });
  },
  
  removeContact(id) {
    return this.allContacts.filter(contact => contact.id !== id);
  },
  
  addHTMLForm(formData) {
    const html = this.renderHandlebarsHTML('#contact-form-template', formData);
    const parent = this.find('.main-container');
    parent.innerHTML += html;
  },
  
  addContact(contactData) {
    this.allContacts.push(contactData);
    this.insertContactHTML(contactData);
  },
  
  editContact(contactData) {
    const contact = this.allContacts.filter(contact => contact.id === contactData.id);
    this.insertContactHTML(contactData);
  },
  
  insertContactHTML(contactData) {
    const contacts = { contacts: this.allContacts };
    const html = this.renderHandlebarsHTML('#contacts-template', contacts);
    let contactsContainer = this.find('.all-contacts');
    contactsContainer.innerHTML += html;
  },
  
  removeEditForm() {
    const formForEditing = this.find('#edit-contact-form');
    if (formForEditing) {
      formForEditing.remove();
    }
  },
  
  updateDisplayToCancel() {
    const unHideEls = ['.add-search-container', '.all-contacts'];
    if (this.findAll('ul').length <= 2) { 
      unHideEls.push('.empty-contacts'); 
    }
    
    this.removeEditForm();
    this.addClass('hide', '#add-contact-form');
    this.removeClass('hide', ...unHideEls);
  },
  
  displayAddForm() {
    this.addClass('hide', '.add-search-container',  '.empty-contacts', '.all-contacts');
    this.removeClass('hide', '#add-contact-form');
  },
  
  addEditDisplayUpdate(data, formId) {
    if (formId.match('add')) {
      this.addContact(data);
    } else {
      this.editContact(data);
    }
    this.addClass('hide', formId);
    this.removeClass('hide', '.add-search-container', '.all-contacts');
  },
  
  proposedContact(formId) {
    const form = this.find(formId);
    const contact = {};
    const desiredProps = ["full_name", "email", "phone_number", "tags"];
    
    formId.match('edit') ? desiredProps.push('id') : 'do nothing';
    this.arrify(form).forEach(element => {
      if (desiredProps.includes(element.id)) {
        //debugger;
        //console.log(element.value);
        //console.log(element);
        if (element.value === '' && formId.match('edit')) {
          contact[element.name] = element.getAttribute('placeholder');
        } else {
          contact[element.name] = element.value;
        }
      }
    });
    
    return contact;
  },
  
  editOrDeleteContact(target, xhrRequest) {
    const deleteHref = target.href.match('delete/');
    const editHref = target.href.match('edit/');
            
    if (deleteHref) { 
      this.deleteContact(deleteHref, target, xhrRequest);
    } else if (editHref) {
      this.displayEditForm(editHref, target);
    }
  },
  
  deleteContact(deleteHref, target, xhrRequest) {
    const confirmed = confirm("Are you sure you want to delete this contact?");
    if (confirmed) {
      const id = Number(this.anchorContactId(deleteHref, target.href));
      xhrRequest.deleteContact(id);
      this.allContacts = this.removeContact(id);
        target.parentNode.parentNode.remove();
                
        if (this.allContacts.length === 0) {
          this.removeClass('hide', '.empty-contacts');
        }
      }
    },
      
  displayEditForm(editHref, target) {
    this.addClass('hide', '.add-search-container', '.all-contacts');
    const id = Number(this.anchorContactId(editHref, target.href));
    const contact = this.allContacts.filter(contact => contact.id === id)[0];
    
    let attributes = Object.keys(contact).filter(key => key !== 'id');
    attributes.forEach(property => {
      if (property !== 'tags') {
        this.editForm[property] = "placeholder='" + contact[property] + "'";
      } else {
        this.editForm[contact[property]] = "selected";
      }
    });
              
    this.editForm["idValue"] = `value='${id}'`;
    this.addHTMLForm(this.editForm);
    this.removeClass('hide', '#edit-contact-form');
  },
      
  submitForm(target, xhr, Contact) {
    const self = this;
    const addFormFlag = target.form.innerHTML.match('Create');
    let formId = '-contact-form'; 
    formId = (addFormFlag ? '#add' : '#edit') + formId;

    let contact = Object.create(Contact).init(this.proposedContact(formId));
    if (Array.isArray(contact)) {
      contact.forEach(errorMsg => alert(errorMsg));
    } else {
      if (formId === '#add-contact-form') {
        xhr.saveContact(contact).then(function(contact) {
          self.addEditDisplayUpdate(contact, formId);
        });
      } else {
        xhr.updateContact(contact).then(function(contacts) {
          self.addEditDisplayUpdate(contact, formId);
        });
      }
    }
  },
};

export function domManager()  {
  return DomManager;
}
