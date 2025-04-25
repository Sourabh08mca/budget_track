import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TransactionList from './component/TransactionList'
import TransactionForm from './component/TransactionForm'
import UpdateForm from './component/UpdateForm'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TransactionList/>}></Route>
          <Route path='/form' element={<TransactionForm/>}></Route>
          <Route path='/update/:id' element={<UpdateForm/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
