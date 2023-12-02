import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const storedContacts = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(storedContacts);

      if (parsedContacts) {
        setContacts(parsedContacts);
      }
    } catch (error) {
      console.error('Error loading contacts from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    const jsonContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', jsonContacts);
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (contactExists(name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = e => {
    setFilter(e.currentTarget.value);
  };

  const contactExists = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <p>Find contact by name</p>
        <Filter filter={filter} addFilter={filteredContacts} />
        <ContactList
          contacts={getVisibleContacts()}
          deleteContact={deleteContact}
        />
      </div>
    </>
  );
};

export default App;
