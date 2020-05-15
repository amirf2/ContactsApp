
export const parseRandomContact = (contact) => {
    const {name, picture, cell} = contact.results[0];
    const {first, last, title} = name;
    const fullName = `${first} ${last}`;
    const newContact = {
        name: fullName,
        phone: cell.split(/[ ()-]/).join(""),
        title: title,
        avatar: picture.large
    }
    const validInput = newContact.name.length<=30 && newContact.phone.length<=15 && newContact.title.length<=10 && newContact.avatar.length<=50;
    if (validInput){
        return newContact;
    }
}