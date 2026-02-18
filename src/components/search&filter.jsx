import React from 'react';
import { useState, useEffect } from 'react'

function App() {

  const [users, setUsers] = useState([
  { id: 1, name: "Gurdeep", role: "developer" },
  { id: 2, name: "Aman", role: "designer" },
  { id: 3, name: "Ravi", role: "manager" }
  ]);
  
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
    
  const filteredUsers = users.filter(u=> {
    if(query !== '' && role !== 'all'){
      return (u.name.toLowerCase().includes(query) && u.role === role)
    }
    
    if(query !== ''){
      return u.name.toLowerCase().includes(query)
    }
    
    if(role !== 'all'){
      return u.role === role 
    }
    
    return true
  });  
    
  const handleSearch = (val) => {
    setQuery(val)
  }  
  
  const handleRole = (val) => {
    setRole(val)
  }
 
  return (
    <div>
      <input type="text" value={query} onChange={(e)=>handleSearch(e.target.value.toLowerCase().trim())}/>
      Role : <select value={role} onChange={(e) => handleRole(e.target.value)}>
        <option value="all">All</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
      </select>
      {filteredUsers.length ?
      (<ul>
        {filteredUsers.map((item)=>(
        <li key={item.id}>{item.name} - {item.role}</li>
        ))}
      </ul>) : (<p>No Results</p>)
      }
    </div>
  )
}

export default App
