import React, { useEffect, useState } from 'react'
import api from '../services/api'
import TaskItem from './TaskItem'

export default function TaskList(){
  const [tasks, setTasks] = useState([]); const [loading,setLoading]=useState(false); const [error,setError]=useState('')
  const fetchData = async ()=>{ setLoading(true); setError(''); try{ const res=await api.getTasks(); setTasks(res.tasks); }catch(e){ setError('Failed to load') }finally{ setLoading(false) } }
  useEffect(()=>{ fetchData(); const onStorage = ()=>fetchData(); window.addEventListener('storage', onStorage); return ()=>window.removeEventListener('storage', onStorage) },[])
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Tasks</h3>
      {loading && <div className="text-center"><div className="spinner inline-block"></div></div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && tasks.length===0 && <div className="text-gray-600">No tasks yet</div>}
      <div className="space-y-3">
        {tasks.map(t=> <TaskItem key={t._id} task={t} onChanged={fetchData}/>)}
      </div>
    </div>
  )
}
