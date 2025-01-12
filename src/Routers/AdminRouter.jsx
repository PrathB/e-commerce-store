import React from 'react'
import { Route } from 'react-router-dom'
import Admin from '../admin/components/Admin'

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Admin/>}/>
      </Routes>
    </div>
  )
}

export default AdminRouter
