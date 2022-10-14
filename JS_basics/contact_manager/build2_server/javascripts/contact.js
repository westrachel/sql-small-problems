const Contact = (() => {
  const INPUT_REGEX = {
    'full_name': ['[A-Za-z]{1,}', 'Fullname must have >= 1 alphabetical character'],
    'email': ['[A-Za-z]{1,}@[A-Za-z]{1,}\.[A-Za-z]{2,}', 
              'Ensure there is a leading name, an @, and an extension in the email'],
    'phone_number': ['[0-9]{3}-[0-9]{3}-[0-9]{4}',
                     'Phone number should have 10 digits & appropriate hyphens (ex: 222-222-2222)']
  };

  const DANGER_CHARS_ENCODING = {
    '&': '&amp',
    '>': '&lt',
    '<': '&gt',
    '"': '&quot',
    "'": '&#x27',
  };
  
  return {
    invalidErrorMsgs(...proposed) { // email, name, phone
      const vals = { email: proposed[0],
                   full_name: proposed[1],
                   phone_number: proposed[2] };
      const msgs = [];
                 
      Object.keys(vals).map(property => {
        if (!vals[property].match(INPUT_REGEX[property][0])) {
          msgs.push(INPUT_REGEX[property][1]);
        }
      });
      return msgs;
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
  
    init(props) {
      const errorMsgs = this.invalidErrorMsgs(props.email, props.full_name, props.phone_number);
      if (!errorMsgs) {
        return errorMsgs;
      } else {
        this.email = this.encodeBadChars(props.email);
        this.full_name = this.encodeBadChars(props.full_name);
        this.phone_number = props.phone_number;
        this.id = props.id;
        this.tags = props.tags;
        return this;
      }
    },

  };

})();

export function contactCreator()  {
  return Contact;
}