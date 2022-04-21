import React from 'react'

const Part = ({ exercise, name }) => {
  return (
    <li>
      {name} {exercise}
    </li>
  )
}

export default Part
