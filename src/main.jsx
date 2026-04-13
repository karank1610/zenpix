import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import Header from './components/Header.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Collection from './Collection.jsx'
import ImageInfo from './ImageInfo.jsx'
import CollectionInfo from './CollectionInfo.jsx'
import ContactUs from './ContactUs.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Collections' element={<Collection/>}/>
    <Route path='/image/:id' element={<ImageInfo/>}/>
    <Route path='/Collection/:id' element={<CollectionInfo/>}/>
    <Route path='/ContactUs' element={<ContactUs/>}/>
  </Routes>
  </BrowserRouter>
  </>
)
