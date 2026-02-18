import React from 'react';
import { useState, useEffect } from 'react'

function App() {
  const [filter, setFilter]=useState("all");
  
  const [todos, setTodos] = useState([
    {id:1, title:'todo 1', status:'pending'},
    {id:2, title:'todo 2', status:'pending'},
    {id:3, title:'todo 3', status:'pending'},
    {id:4, title:'todo 4', status:'complete'},
    {id:5, title:'todo 5', status:'complete'},
    ])

    const filteredTodos = todos.filter(todo => {
      if (filter === "all") return true;
      return todo.status === filter;
    });
    
    const handleMarked = (id) => {
      setTodos(prev => prev.map(todo=>
        todo.id === id
        ? { ...todo, status: todo.status === 'complete' ? 'pending' : 'complete'}
        : todo
      ))
    }
    
    const filterChange = (v) => {
      setFilter(v)
    }
    
    const onAdd = () => {
      const updatedTodos = [...todos,
        {id:Date.now(), title:`todo ${Date.now()}`,status:'pending'}
        ]
        setTodos(updatedTodos)
    }
    
  return (
    <div>
      <select value={filter} onChange={(e)=>filterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="complete">Complete</option>
      </select>
      <button onClick={onAdd}>Add Todo</button>
      <p>Count - {filteredTodos.length}</p>
      <ul>
        {filteredTodos.map((todo)=>(
        <>
        <input onChange={()=>handleMarked(todo.id)} checked={todo.status === 'complete'} type="checkbox"/>
        <li key={todo.id}>{todo.title}</li>
        </>
        ))}
      </ul>
    </div>
  )
}

export default App
