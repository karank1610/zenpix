import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Home.jsx'
import Header from './components/Header.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Collection from './Collection.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Collections' element={<Collection/>}/>
  </Routes>
  </BrowserRouter>
  </>
)
