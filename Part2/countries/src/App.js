import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './Search'
import Results from './Results'

function App() {
  const [countryData, setCountryData] = useState([])
  const [newQuery, setNewQuery] = useState('')

  console.log(countryData)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountryData(response.data)
    })
  }, [])

  return (
    <>
      <Search newQuery={newQuery} setNewQuery={setNewQuery} />
      <Results countryData={countryData} newQuery={newQuery} />
    </>
  )
}

export default App
