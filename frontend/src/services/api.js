import axios from 'axios'
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'
const client = axios.create({ baseURL: BASE })
export default {
  createTask: (data)=> client.post('/api/tasks', data).then(r=>r.data),
  getTasks: (params={})=> client.get('/api/tasks', { params }).then(r=>r.data),
  getTask: (id)=> client.get(`/api/tasks/${id}`).then(r=>r.data),
  updateTask: (id,data)=> client.put(`/api/tasks/${id}`, data).then(r=>r.data),
  deleteTask: (id)=> client.delete(`/api/tasks/${id}`).then(r=>r.data)
}
