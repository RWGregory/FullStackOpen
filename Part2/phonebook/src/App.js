import { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import Directory from './Directory'
import Filter from './Filter'
import contactService from './services/contacts.js'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState([])
  const [newQuery, setNewQuery] = useState('')

  useEffect(() => {
    contactService.getContacts().then((response) => setContacts(response.data))
  }, [])

  const regex = new RegExp(newQuery, 'i')
  const newContact = {
    name: newName,
    number: newNumber,
  }
  const names = contacts.map((contact) => contact.name)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (names.includes(newName)) {
      const indexOfName = names.indexOf(newName)
      const filteredContacts = (phonebook) =>
        phonebook.filter((contact, index) => phonebook[index] !== newContact)
      window.confirm(
        `${newName} is already added to phonebook. Click OK to replace the old number.`,
      )
      contactService
        .editContact(contacts[indexOfName].id, newContact)
        .then((response) => {
          contactService
            .getContacts()
            .then((response) => setContacts(response.data))
          console.log(response)
        })
      return
    }
    contactService
      .addContact(newContact)
      .then((response) => setContacts(contacts.concat(response.data)))
    setNewName('')
    setNewNumber([])
  }
  const handleChange = (e) => {
    switch (e.target.id) {
      case 'name':
        setNewName(e.target.value)
        break
      case 'number':
        setNewNumber(e.target.value)
        break
      case 'filter':
        setNewQuery(e.target.value)
    }
    console.log(e)
  }

  const handleRemove = (e) => {
    if (window.confirm(`Delete ${e.target.name}?`)) {
      contactService.removeContact(e.target.id).then((response) => {
        contactService
          .getContacts()
          .then((response) => setContacts(response.data))
        console.log(response)
      })
    }
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.match(regex),
  )

  const mapContacts = filteredContacts.map((contact) => (
    <div key={contact.id}>
      {contact.name} {contact.number}
      <button id={contact.id} name={contact.name} onClick={handleRemove}>
        Remove
      </button>
    </div>
  ))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newQuery={newQuery} handleChange={handleChange} />

      <h3>Add a Contact</h3>
      <ContactForm
        newName={newName}
        handleChange={handleChange}
        handleClick={handleSubmit}
      />

      <h2>Numbers</h2>
      <Directory mapContacts={mapContacts} />
    </div>
  )
}

export default App
