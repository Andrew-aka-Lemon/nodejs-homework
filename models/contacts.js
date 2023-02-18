// const fs = require('fs/promises')

const listContacts = async () => {
  let contacts = [];
  try {
    contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  } catch (error) {
    console.log("Can't read Contacts!");
  }

  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const choosenContact = contacts.filter(contact => contact.id === contactId);
  if (choosenContact.length === 0) {
    console.log('There is no book with such ID !');
    return null;
  }
  return choosenContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();

  const withoutChoosenContact = contacts.filter(
    contact => contact.id !== contactId
  );

  if (contacts.length === withoutChoosenContact.length) {
    console.log('There is no contact with such ID !');
    return null;
  }

  fs.writeFile(contactsPath, JSON.stringify(withoutChoosenContact, null, 2));

  return withoutChoosenContact;
};

const addContact = async body => {
  const id = nanoid();
  const { name, email, phone } = body;
  const newContact = { id, name, email, phone };

  const contacts = await listContacts();

  const newContacts = [...contacts, newContact];

  fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return newContacts;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
