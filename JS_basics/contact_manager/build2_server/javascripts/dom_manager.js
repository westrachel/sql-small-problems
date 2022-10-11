const DomManager = {
  
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
  
  addHTMLForm(formData) {
    const html = this.renderHandlebarsHTML('#contact-form-template', formData);
    const parent = this.find('.main-container');
    parent.innerHTML += html;
  },
  
  addContactsHTML(contactData) {
    if (contactData.length !== 0) {
      const contacts = { contacts: contactData };
      const html = this.renderHandlebarsHTML('#contacts-template', contacts);
      let contactsContainer = this.find('.all-contacts');
      contactsContainer.innerHTML += html;
    }
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
    this.addContactsHTML(data);
    this.addClass('hide', '#add-contact-form');
    this.removeClass('hide', '.add-search-container', '.all-contacts');
  },
  
  proposedContact(formId) {
    const form = this.find(formId);
    const contact = {};
    const desiredProps = ["full_name", "email", "phone_number", "tags"];
    
    formId.match('edit') ? desiredProps.push('id') : 'do nothing';
    
    this.arrify(form).forEach(element => {
      if (desiredProps.includes(element.id)) {
        contact[element.name] = element.value;
      }
    });
    
    return contact;
  },
      
  displayEditForm(editHref, target, editForm) {
    this.addClass('hide', '.add-search-container', '.all-contacts');
    const id = Number(this.anchorContactId(editHref, target.href));
    const contact = this.allContacts.filter(contact => contact.id === id)[0];
              
    const selectedTags = Object.keys(editForm).filter(key => {
      key.match('(sales|marketing|engineering|hr|accounting|admin|cs)');
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
    this.addHTMLForm(editForm);
    this.removeClass('hide', '#edit-contact-form');
  },
      
  submitForm(target, xhr, Contact) {
    const addFormFlag = target.form.innerHTML.match('Create');
    let formId = '-contact-form'; 
    formId = (addFormFlag ? '#add' : '#edit') + formId;

    let contact = Object.create(Contact).init(this.proposedContact(formId));
    console.log(contact);
    if (Array.isArray(contact)) {
      contact.forEach(errorMsg => alert(errorMsg));
    } else {
      if (formId === 'add-contact-form') {
        xhr.saveContact(contact).then(function(contact) {
          this.addEditDisplayUpdate(contact, formId);
        });
      } else {
        xhr.updateContact(contact).then(function(contacts) {
          this.addEditDisplayUpdate(contact, formId);
        });
      }
    }
  },
};

export function domManager()  {
  return DomManager;
}
