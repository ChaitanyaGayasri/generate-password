 import { useState } from 'react'


import './App.css'
import UsePasswordGenerator from './hooks/UsePasswordGenerator'

function App() {

  const [copy,setCopy] = useState(false)

  const [length, setLength] = useState(4)
  const [checkboxData, setCheckBoxData] = useState( [
    { title: "Include Uppercase Letters", state: false},
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Number", state: false },
    { title: "Include Symbols", state: false },

  ])


  const handleCheckBoxData = (i) => {
    const updatedCheckBoxData = [...checkboxData]
    updatedCheckBoxData[i].state = !updatedCheckBoxData[i].state
    setCheckBoxData(updatedCheckBoxData)
  }
  
  const {password,errorMessage,generatePassword} = UsePasswordGenerator()


  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopy(true)
  }

  setTimeout(() => {
    setCopy(false)
  },1000)

  return (
   <div className='container'>
    <div className='app'>
        {
          password && (
            <div className='header'>
              <div className='title'>{password}</div>
              <button className='copyBtn' onClick={handleCopy}>{ copy ? "Copied" : "Copy"}</button>
            </div>

          )
}
        <div className='charlength'>
        <span>
          <label>Character Length</label>
            <label>{ length}</label>
        </span>
        <input value={length} onChange={(e) => setLength(e.target.value)} type='range' min="4" max ="20"/>
      </div>
      <div className='checkboxes'>
        {
          checkboxData.map((checkbox,index) => {
            return <div key={index}>
              <input type='checkbox' onChange={ () => handleCheckBoxData(index)} checked={checkbox.state} />
              <label className='check'>{checkbox.title }</label>
            </div>
          })
        }
        </div>
        
        {/* error handlling  */}

        {errorMessage && <div className='errorMsg'> { errorMessage}</div>}
<button className='generateBtn' onClick={() => generatePassword(checkboxData,length)}>Generate Password</button>
      </div>
      </div>
  )
}

export default App
