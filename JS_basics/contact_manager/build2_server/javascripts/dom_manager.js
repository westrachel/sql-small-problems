const DomManager = {
  
  find(selector) {
    return document.querySelector(selector);
  },
  
  selectors: {
    search: '.search',
    addSearch: '.add-search-container',
    noContacts: '.empty-contacts',
    contactsDiv: '.all-contacts',
    contactsTemp: '#contacts-template'
  },
  
  template(id) {
    return Handlebars.compile(this.find(id).innerHTML);
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
  
  addHTMLForm(formObject) {
    let renderAsHTML = this.template('#contact-form-template');
    let html = renderAsHTML(formObject);
    let parent = this.find('.main-container');
    parent.innerHTML += html;
  },
  
  addContactsHTML() {
    const self = this;
    self.find(self.selectors.contactsDiv).remove();
    let htmlData = self.selectors.contacts({ contacts: self.allContacts });
    let contactsContainer = self.find('.contacts-container');
    contactsContainer.innerHTML += htmlData;
  },
  
  formIds() {
    const forms = document.querySelectorAll('form');
    forms = Array.prototype.slice.call(forms);
    return forms.map(el => '#' + el.id);
  },
  
  updateDisplayToCancel(editForm) {
    const unHideEls = [this.selectors.addSearch,
                       this.selectors.contactsDiv];
    if (this.allContacts.length === 0) { 
      unHideEls.push(this.selectors.noContacts); 
    }
    const formForEditing = this.find('#' + editForm.id);
      if (formForEditing) {
        formForEditing.remove();
      }
        
    this.addClass('hide', ...this.formIds());
    this.removeClass('hide', ...unHideEls);
  },
  
  displayAddForm() {
    this.addClass('hide', '.add-search-container',  '.empty-contacts', '.all-contacts');
    this.removeClass('hide', this.selectors.addForm);
  },
      
  displayEditForm(editHref, target, editForm) {
    this.addClass('hide', this.selectors.addSearch, this.selectors.contactsDiv);
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
      
  submitForm(target) {
    if (this.validContactInput(target.closest('form'))){
      if (target.form.id === 'add-contact-form') {
        this.allContacts.push(this.createContact(this.find(this.selectors.addForm)));
        this.addClass('hide', this.selectors.addForm);
      } else {
        this.editContacts(target);
      }
            
      this.addContactsHTML();
      this.removeClass('hide', this.selectors.addSearch);
    }
  },
};

export function domManager()  {
  return DomManager;
}
