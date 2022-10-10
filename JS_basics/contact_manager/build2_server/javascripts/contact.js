let contactId = 0;

const DANGER_CHARS_ENCODING = {
  '&': '&amp',
  '>': '&lt',
  '<': '&gt',
  '"': '&quot',
  "'": '&#x27',
};

let Contact = {
  invalidPropErrorMsg(property, proposed) {
    const INPUT_REGEX = {
      'full_name': ['[A-Za-z]{1,}', 'Fullname must have >= 1 alphabetical character'],
      'email': ['[A-Za-z]{1,}@[A-Za-z]{1,}\.[A-Za-z]{2,}', 
               "Ensure there's a leading name, an @, and an extension in the email"],
      'phone_number': ['[0-9]{3}-[0-9]{3}-[0-9]{4}',
                "Phone number should have 10 digits & appropriate hyphens (ex: 222-222-2222)"]
    };
      
    if (!proposed.match(INPUT_REGEX[property][0])) {
      return INPUT_REGEX[property][1];
    }
  },
  
  encodeBadChars(string) {
    return string.split('').map(char => {
      if (DANGER_CHARS_ENCODING[char]) {
        return DANGER_CHARS_ENCODING[char];
      } else {
        return char;
      }
    }).join('');
  },
    
  edit(newInfoObj) {
    for (let property in newInfoObj) {
      let newValue = newInfoObj[property];
      if (this.invalidPropErrorMsg(property, newValue)) {
        break;
      } else {
        this[property] = this.encodeBadeChars(newValue);
      }
    } 
  },
    
  generateContactId() {
    return contactId += 1;
  },
  
  init(email, name, phone, tags=null) {
    this.email = email;
    this.full_name = name;
    this.id = this.generateContactId();
    this.phone_number = phone;
    this.tags = tags;
    return this;
  },

};

export function createContact(email, name, phone, tags)  {
  return Object.create(Contact).init(email, name, phone, tags);
}