const RequestManager = {
  createUrl(id=null) {
    const BASE_URL = 'http://localhost:3000/api/contacts';
    return id ? BASE_URL + '/:' + id : BASE_URL;
  },
  
  getContacts() {
    return this.makeRequest('GET', 'No Contacts');
  },
  
  getContact(id) {
    return this.makeRequest('GET', 'No Contact', id);
  },
  
  deleteContact(id) {
    return this.makeRequest('DELETE', 'Contact not found', id);
  },
  
  saveContact(data) {
    return this.makeRequest('POST', 'Contact not found', null, data);
  },
  
  updateContact(data) {
    return this.makeRequest('POST', 'Contact not found', null, data);
  },
  
  makeRequest(httpMethod, rejectVal, id=null, data=null) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      request.open(httpMethod, this.createUrl(id));
      
      request.addEventListener('load', () => {
        if (request.status[0] === '2') {
          resolve(request.response);
        } else {
          reject(rejectVal);
        }
      });
      
      this.sendRequest(request, data);
    });
  },
  
  sendRequest(request, requestData) {
    if (requestData) {
      request.sendRequestHeader('Content-Type', 'application/json; charset=utf-8');
      let json = JSON.stringify(requestData);
      request.send(json);
    } else {
      request.send();
    }
  },

};

export function requestManager()  {
  return RequestManager;
}