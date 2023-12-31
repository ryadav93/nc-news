import { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Nav from './components/Nav'
import Topics from './components/Topics'
import Login from './components/Login'
import Articles from './components/Articles'
import ArticleById from './components/ArticleById'
import './App.css'
import { UserContext } from './contexts/Theme.jsx'



function App() {
 
 const {user} = useContext(UserContext)

  return (
   
    <div className='app'>
      <Header/>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/articles' element={<Articles/>}></Route>
        <Route path ='/articles/:article_id' element={<ArticleById/>}></Route>
        <Route path = '/articles/:article_id/comments' element={<ArticleById/>}></Route>
        <Route path = '/comments/:comment_id' element={<ArticleById/>}></Route>
        <Route path='/topics' element={<Topics/>}></Route>
        <Route path='/users' element={<Login/>}></Route>
        <Route path ='*' element={<p>Path Not Found</p>}></Route>
      </Routes>
    </div>
   
  )
}

export default App
