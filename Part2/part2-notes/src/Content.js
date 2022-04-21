import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
  const exercises = parts.map((part) => part.exercises)

  const elements = parts.map((part) => (
    <Part exercise={part.exercises} name={part.name} />
  ))

  return (
    <>
      <ul>{elements}</ul>
      <h4>
        Total exercises: {exercises.reduce((prev, current) => prev + current)}
      </h4>
    </>
  )
}

export default Content
