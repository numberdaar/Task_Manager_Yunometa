import React, { useState } from 'react'
import api from '../services/api'

export default function TaskItem({ task, onChanged }){
  const [editing,setEditing]=useState(false)
  const [title,setTitle]=useState(task.title)
  const [desc,setDesc]=useState(task.description)
  const [status,setStatus]=useState(task.status)
  const [loading,setLoading]=useState(false)
  const save = async ()=>{ setLoading(true); try{ await api.updateTask(task._id, { title, description: desc, status }); setEditing(false); onChanged(); }catch(e){ alert('Failed') }finally{ setLoading(false) } }
  const remove = async ()=>{ if(!confirm('Delete?')) return; try{ await api.deleteTask(task._id); onChanged(); }catch(e){ alert('Failed') } }
  return (
    <div className="border p-3 rounded flex justify-between items-start">
      {!editing ? (
        <div>
          <div className="font-semibold">{task.title}</div>
          <div className="text-sm text-gray-600">{task.description}</div>
          <div className="text-xs text-gray-500 mt-1">Status: {task.status}</div>
        </div>
      ) : (
        <div className="w-full">
          <input value={title} onChange={e=>setTitle(e.target.value)} className="border p-1 w-full mb-1"/>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} className="border p-1 w-full mb-1"/>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="border p-1 w-full mb-1">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}
      <div className="flex flex-col gap-2 ml-3">
        {!editing ? <button onClick={()=>setEditing(true)} className="text-sm text-blue-600">Edit</button> : <button onClick={save} className="text-sm text-green-600">{loading ? 'Saving...' : 'Save'}</button>}
        <button onClick={remove} className="text-sm text-red-600">Delete</button>
      </div>
    </div>
  )
}
