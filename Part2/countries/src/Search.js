import React from 'react'

const Search = ({ setNewQuery, newQuery }) => {
  const handleChange = (e) => setNewQuery(e.target.value)

  return (
    <form>
      <input onChange={handleChange} value={newQuery} />
    </form>
  )
}

export default Search
