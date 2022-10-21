import countries from './countries.json' assert {type: 'json'};

const AutoComplete = {
  init() {
    this.bindEvent();
  },
  
  bindEvent() {
    document.querySelector('input').addEventListener('keyup', event => {
      this.updateUl(event.target.innerText);
    });
  },
  
  updateUl(search) {
    const matches = this.findMatches(search);
    const parent = this.document.querySelector('ul');
    matches.foreEach(country => {
      parent.appendChild(this.createLi(country));
    });
  },
  
  createLi(country) {
    const li = document.creatElement('li');
  },
  
  findMatches(search) {
    return countries.filter(obj => {
      const regex = new RegExp(`^${search}`, 'i')
      return obj.name.match(regex);
    })
  },
  
};

document.addEventListener('DOMContentLoaded', event => {
  AutoComplete.init();
});