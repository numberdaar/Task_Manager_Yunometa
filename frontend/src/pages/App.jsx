import React, { useEffect, useState } from 'react'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import Login from '../components/Login'

export default function App(){
  const [logged, setLogged] = useState(!!localStorage.getItem('tm_token'))
  return (
    <div className="min-h-screen p-6 bg-slate-50">
      {!logged ? <Login onLogin={()=>setLogged(true)}/> : (
        <div className="container mx-auto">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Task Manager</h1>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={()=>{ localStorage.removeItem('tm_token'); setLogged(false);}}>Logout</button>
          </header>
          <TaskForm/>
          <TaskList/>
        </div>
      )}
    </div>
  )
}
