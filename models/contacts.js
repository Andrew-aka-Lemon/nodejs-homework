const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    return contacts;
  } catch (error) {
    console.log("Can't read Contacts!");
  }
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const choosenContact = contacts.filter(contact => contact.id === contactId);
  if (choosenContact.length === 0) {
    console.log('There is no contact with such ID !');
    return null;
  }
  return choosenContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();

  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    console.log('There is no contact with such ID !');
    return null;
  }
  const deletedContact = contacts[index];

  contacts.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return deletedContact;
};

const addContact = async body => {
  const id = nanoid();
  const newContact = { id, ...body };

  const contacts = await listContacts();

  const newContacts = [...contacts, newContact];

  fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    console.log('There is no contact with such ID !');
    return null;
  }

  const updatedContact = { id: contactId, ...body };

  contacts.splice(index, 1, updatedContact);

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
