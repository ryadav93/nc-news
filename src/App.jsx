import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Nav from './components/Nav'
import Topics from './components/Topics'
import Login from './components/Login'
import Articles from './components/Articles'
import ArticleById from './components/ArticleById'
import './App.css'

function App() {
 

  return (
    <div className='app'>
      <Header/>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/articles' element={<Articles/>}></Route>
        <Route path ='/articles/:article_id' element={<ArticleById/>}></Route>
        {/* <Route path='/topics' element={<Topics/>}></Route> */}
      </Routes>
      
      
   
    </div>
  )
}

export default App
