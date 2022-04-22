import { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import Directory from './Directory'
import Filter from './Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState([])
  const [newQuery, setNewQuery] = useState('')
  console.log(persons)

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])

  const regex = new RegExp(newQuery, 'i')

  const names = persons.map((person) => person.name)

  const handleClick = (e) => {
    e.preventDefault()
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
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
  }

  const filteredPersons = persons.filter((person) => person.name.match(regex))

  const mapPersons = filteredPersons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
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
        handleClick={handleClick}
      />

      <h2>Numbers</h2>
      <Directory mapPersons={mapPersons} />
    </div>
  )
}

export default App
