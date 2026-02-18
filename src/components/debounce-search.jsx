import React from 'react';
import { useState, useEffect, useMemo,useCallback  } from 'react'


function debounce(cb, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
}

function App() {
  
  const [query, setQuery] = useState("")
 
  const fetchProducts = useCallback(async (term) => {
    const url = `https://dummyjson.com/products/search?q=${term}`  
    const res = await fetch(url)
    const data = await res.json()
  },[])
  
  const debouncedFetch = useMemo(()=>debounce(fetchProducts,1000), [fetchProducts]);
    
  const handleSearch = (value) => {
    setQuery(value)
    debouncedFetch(value)
  }

  return (
    <div>
      <input placeholder="Search..." type="text" value={query} onChange={(e)=>handleSearch(e.target.value.toLowerCase().trim())}/>
    </div>
  )
}

export default App
