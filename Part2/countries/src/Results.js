import React from 'react'
import CountryInfo from './CountryInfo'

const Results = ({ newQuery, countryData }) => {
  const countryNames = countryData.map((country) => country.name.common)
  const countryArea = countryData.map((country) => country.area)
  const countryCapital = countryData.map((country) => country.capital)
  const countryRegion = countryData.map((country) => country.region)
  const countryFlags = countryData.map((country) => country.flags.svg)
  const countryLanguages = Object.values(
    countryData.map((country) => country.languages),
  )

  const regex = new RegExp(newQuery, 'i')
  const filteredNames = countryNames.filter((country) => country.match(regex))

  return (
    <>
      {filteredNames.length === 1 ? (
        <CountryInfo
          countryArea={countryArea}
          countryCapital={countryCapital}
          countryRegion={countryRegion}
          countryFlags={countryFlags}
          countryNames={countryNames}
          countryLanguages={countryLanguages}
          filteredNames={filteredNames}
        />
      ) : filteredNames.length <= 10 ? (
        filteredNames.map((name) => <div>{name}</div>)
      ) : (
        'Needs more input'
      )}
    </>
  )
}

export default Results
