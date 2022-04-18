import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.id}</button>
}

const SubmitFeedback = (props) => {
  const handleClick = (setState) => () => {
    setState((prev) => prev + 1)
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={handleClick(props.setGood)} id="good" />
      <Button onClick={handleClick(props.setNeutral)} id="neutral" />
      <Button onClick={handleClick(props.setBad)} id="bad" />
    </>
  )
}

const Count = (props) => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.current}</td>
    </tr>
  )
}

const Stats = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / total
  const positiveShare = props.good / total

  return (
    <table>
      <tbody>
        <Count id="good" current={props.good} />
        <Count id="neutral" current={props.neutral} />
        <Count id="bad" current={props.bad} />
        <Count id="Total" current={total} />
        <Count id="Average" current={average} />
        <Count id="Positive Share" current={positiveShare * 100 + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log(good, neutral, bad)
  return (
    <div>
      <SubmitFeedback
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad}
      />
      <h1>Statistics</h1>
      {good || neutral || bad ? (
        <Stats good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback received</p>
      )}
    </div>
  )
}

export default App
