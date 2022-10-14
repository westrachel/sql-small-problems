let Form = {
  init(id, title) {
    this.id = id;
    this.title = title;
    this.full_name = '';
    this.email = '';
    this.work = '';
    this.friend = '';
    this.neighbor = '';
    this.family = '';
    return this;
  },

};

export function createForm(id, title)  {
  return Object.create(Form).init(id, title);
}