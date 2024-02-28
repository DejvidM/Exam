import { useState } from 'react'
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import ProjectManager from './components/ProjectManager'
import AddProject from './components/AddProject'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProjectManager/>}></Route>
          <Route path='/projects/new' element={<AddProject/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
