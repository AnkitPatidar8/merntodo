
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
    const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')

  const baseURL = 'https://merntodo-ebon.vercel.app/api/todos' // backend URL

  // fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${baseURL}`)
      setTodos(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTodos() }, [])

  // add todo
  const addTodo = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    try {
      const res = await axios.post(`${baseURL}`, { title })
      setTodos(prev => [res.data, ...prev])
      setTitle('')
    } catch (err) {
      console.error(err)
    }
  }

  // toggle todo
  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.put(`${baseURL}/${id}`, { completed })
      setTodos(prev => prev.map(t => t._id === id ? res.data : t))
    } catch (err) {
      console.error(err)
    }
  }

  // delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`)
      setTodos(prev => prev.filter(t => t._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">To-Do App</h1>

        {/* Todo Form */}
        <form onSubmit={addTodo} className="flex gap-2">
          <input
            className="flex-1 p-2 border rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            type="submit"
          >
            Add
          </button>
        </form>

        {/* Todo List */}
        {loading ? (
          <p className="mt-4">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="mt-4 text-gray-500">No todos yet — add one!</p>
        ) : (
          <div className="mt-4">
            {todos.map(todo => (
              <div
                key={todo._id}
                className="flex items-center justify-between p-2 border-b"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => toggleTodo(todo._id, e.target.checked)}
                  />
                  <span className={`select-none ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                    {todo.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App