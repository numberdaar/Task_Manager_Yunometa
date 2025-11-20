import React, { useState } from 'react'
export default function Login({ onLogin }){
  const [u, setU] = useState(''); const [p,setP]=useState(''); const [err,setErr]=useState('')
  const submit = (e) => { e.preventDefault(); if(u==='user' && p==='1234'){ localStorage.setItem('tm_token','mock-token'); onLogin(); } else setErr('Invalid credentials') }
  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input value={u} onChange={e=>setU(e.target.value)} placeholder="Username = user" className="border p-2 w-full mb-3"/>
        <input value={p} onChange={e=>setP(e.target.value)} placeholder="Password = 1234" type="password" className="border p-2 w-full mb-3"/>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <button className="bg-indigo-600 text-white px-3 py-2 rounded w-full">Login</button>
      </form>
    </div>
  )
}
