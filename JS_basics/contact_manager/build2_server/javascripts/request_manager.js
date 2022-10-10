const RequestManager = {
  BASE_URL: 'http://localhost:3000/api/contacts',

  deleteContact(id){
    const confirmed = confirm("Are you sure you want to delete this contact?");
    if (confirmed) {
      let urlEnd = '/:' + id;
      this.makeRequest('DELETE', urlEnd);
      
    }
  },
  
        deleteContact: function(deleteHref, target) {
        const confirmed = confirm("Are you sure you want to delete this contact?");
        if (confirmed) {
          const id = Number(this.anchorContactId(deleteHref, target.href));
          this.allContacts = this.allContacts.filter(contact => contact.id !== id);
          target.parentNode.parentNode.remove();
                
          if (this.allContacts.length === 0) {
            this.removeClass('hide', SELECTORS.noContacts);
          }
        }
      },
  
  getContacts(cb) {
    this.makeRequest('GET', cb);
  },
  
  getContact(cb, id) {
    let urlEnd = '/:' + id;
    this.makeRequest('GET', cb, urlEnd);
  },
  
  addContact(cb, data) {
    this.makeRequest('POST', cb, data);
  },
    
  makeRequest(httpMethod, callback, urlAddend = '', data=null) {
    let request = new XMLHttpRequest();
    const url = this.BASE_URL + urlAddend;

    request.addEventListener('load', () => {
      callback(request.response);
    });

    request.open(httpMethod, url);
    request.responseType = 'json';
    
    this.sendRequest(request, data=null);
  },
  
  sendRequest(request, data=null) {
    if (data) {
      request.sendRequestHeader('Content-Type', 'application/json; charset=utf-8');
      let json = JSON.stringify(data);
      request.send(json);
    } else {
      request.send();
    }
  }

};

export function requestManager()  {
  return RequestManager;
}
