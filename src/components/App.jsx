import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  // Metoda cyklu życiowego: Wczytaj kontakty z localStorage po zamontowaniu komponentu
  componentDidMount() {
    try {
      const storedContacts = localStorage.getItem('contacts');
      const contacts = JSON.parse(storedContacts);

      if (contacts) {
        this.setState({ contacts });
      }
    } catch (error) {
      console.error('Error loading contacts from localStorage:', error);
    }
  }

  // Sprawdź, czy stan contacts został zmieniony w porównaniu do poprzedniego stanu
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const jsonContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', jsonContacts);
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (this.contactExists(name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filteredContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  contactExists = name => {
    const { contacts } = this.state;
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <div className="container">
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
          <h2>Contacts</h2>
          <p>Find contact by name</p>
          <Filter filter={filter} addFilter={this.filteredContacts} />
          <ContactList
            contacts={visibleContacts}
            deleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}
