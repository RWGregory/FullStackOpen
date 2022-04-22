import React from 'react'

const CountryInfo = ({
  countryArea,
  countryRegion,
  countryFlags,
  countryLanguages,
  countryCapital,
  countryNames,
  filteredNames,
}) => {
  const index = countryNames.indexOf(filteredNames[0])
  console.log(index)

  return (
    <>
      <h1>{countryNames[index]}</h1>
      <img src={countryFlags[index]} />
      <h3>{countryRegion[index]}</h3>
      <h3>{countryArea[index]}</h3>
      <h3>{countryCapital[index]}</h3>
      <h3>{countryNames[index]}</h3>
    </>
  )
}

export default CountryInfo
