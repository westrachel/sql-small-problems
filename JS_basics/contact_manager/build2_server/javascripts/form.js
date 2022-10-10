let Form = {
  init(id, title) {
    this.id = id;
    this.title = title;
    this.full_name = '';
    this.email = '';
    this.phone_number = '';
    this.sales = '';
    this.marketing = '';
    this.engineering = '';
    this.hr = '';
    this.accounting = '';
    this.admin = '';
    this.cs = '';
    return this;
  },

};

export function createForm(id, title)  {
  return Object.create(Form).init(id, title);
}