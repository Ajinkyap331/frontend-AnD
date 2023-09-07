import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Companies } from './Components/Companies/Page'
import { SubComponant } from './Components/SubComponents/Page'
import { ComponentPage } from './Components/Component/page'
import { Offer } from './Components/Offers/page'
import { ProjectPage } from './Components/Project/page'
import { Navigator } from './Components/Navigation/page'


function App() {

  return (
    <div className='w-screen flex'>
      <Router className = "w-full">
        <Navigator />
        <Routes>
          <Route path="/companies" element={<Companies />} />
          <Route path="/subComponant" element={<SubComponant />} />
          <Route path="/component" element={<ComponentPage />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/client" element={<ProjectPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
