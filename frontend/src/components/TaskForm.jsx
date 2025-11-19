import React, { useState } from 'react'
import api from '../services/api'

export default function TaskForm(){
  const [title,setTitle]=useState(''); const [description,setDescription]=useState(''); const [status,setStatus]=useState('pending')
  const [loading,setLoading]=useState(false); const [error,setError]=useState('')
  const submit = async (e) => {
    e.preventDefault()
    if(!title.trim()){ setError('Title required'); return }
    setLoading(true); setError('')
    try{
      await api.createTask({ title, description, status })
      setTitle(''); setDescription(''); setStatus('pending')
      localStorage.setItem('tm_refresh', Date.now())
    }catch(err){ setError(err?.response?.data?.message || 'Failed') }finally{ setLoading(false) }
  }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-3">Add Task</h3>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="border p-2 w-full mb-2"/>
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full mb-2"/>
      <select value={status} onChange={e=>setStatus(e.target.value)} className="border p-2 w-full mb-2">
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button className="bg-green-600 text-white px-3 py-2 rounded">{loading ? 'Saving...' : 'Add Task'}</button>
    </form>
  )
}
