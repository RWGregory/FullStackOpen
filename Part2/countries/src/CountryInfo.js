import React from 'react'
import axios from 'axios'

const CountryInfo = ({
  countryArea,
  countryRegion,
  countryFlags,
  countryLanguages,
  countryCapital,
  countryNames,
  filteredNames,
}) => {
  const [weather, setWeather] = React.useState([])
  const index = countryNames.indexOf(filteredNames[0])
  console.log(weather)
  React.useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countryCapital[index]}&appid=${process.env.REACT_APP_API_KEY}`,
      )
      .then((response) => {
        console.log(response.data)
        setWeather(response.data.weather)
      })
  }, [index])

  return (
    <>
      <h1>{countryNames[index]}</h1>
      <img src={countryFlags[index]} />
      <h3>Region: {countryRegion[index]}</h3>
      <h3>Area: {countryArea[index]}</h3>
      <h3>Capital: {countryCapital[index]}</h3>
      {weather.length > 0 && (
        <>
          <h3>Current Weather: {weather[0].description}</h3>
          <img
            src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            type="image/png"
          />
        </>
      )}
      <h3>Languages: {Object.values(countryLanguages[index]).join(', ')}</h3>
    </>
  )
}

export default CountryInfo
