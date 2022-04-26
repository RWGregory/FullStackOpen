import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './Search'
import Results from './Results'
import './App.css'

function App() {
  const [countryData, setCountryData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [newQuery, setNewQuery] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountryData(response.data)
      setLoaded((prev) => !prev)
    })
  }, [])

  return (
    <>
      <Search newQuery={newQuery} setNewQuery={setNewQuery} />
      <Results countryData={countryData} newQuery={newQuery} loaded={loaded} />
    </>
  )
}

export default App
