const fs = require("fs/promises");
const path = require("path");

const listContacts = async () => {
  const contactsPath = path.join(__dirname, "db/contacts.json");
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const id = String(contactId);
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === id);
  return result || null;
};

const addContact = async (data) => {
  const contactsPath = path.join(__dirname, "db/contacts.json");
  const { nanoid } = await import("nanoid");
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};

const removeContact = async (contactId) => {
  const id = String(contactId);
  const contactsPath = path.join(__dirname, "db/contacts.json");
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
