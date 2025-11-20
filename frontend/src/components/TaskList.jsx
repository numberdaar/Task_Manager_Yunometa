import React, { useEffect, useState } from 'react'
import api from '../services/api'
import TaskItem from './TaskItem'

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // NEW
  const [statusFilter, setStatusFilter] = useState('')        // '' = All
  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const [total, setTotal] = useState(0)

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getTasks({ status: statusFilter, page, limit })
      setTasks(res.tasks)
      setTotal(res.total)
    } catch (e) {
      setError('Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [statusFilter, page])     // re-fetch on filter or page change

  // AUTO REFRESH WHEN A TASK IS ADDED
  useEffect(() => {
    fetchData();

    const refresh = () => fetchData();
    window.addEventListener("task-added", refresh);

    return () => window.removeEventListener("task-added", refresh);
  }, []);


  const totalPages = Math.ceil(total / limit)

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Tasks</h3>

      {/* FILTER BUTTONS */}
      <div className="flex gap-2 mb-3">
        {['', 'pending', 'in-progress', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => { setStatusFilter(f); setPage(1); }}
            className={`px-3 py-1 rounded border 
              ${statusFilter === f ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            {f === '' ? 'All' : f.replace('-', ' ')}
          </button>
        ))}
      </div>

      {loading && <div className="text-center"><div className="spinner inline-block"></div></div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && tasks.length === 0 && <div className="text-gray-600">No tasks found</div>}

      <div className="space-y-3">
        {tasks.map(t => <TaskItem key={t._id} task={t} onChanged={fetchData} />)}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >Prev</button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border 
                ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >Next</button>
        </div>
      )}
    </div>
  )
}
