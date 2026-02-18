import React from 'react';
import { useState, useEffect, useMemo,useCallback,useReducer  } from 'react'

const products = [
  { id:1, title:"Prod 1", quantity:1, price:60},
  { id:2, title:"Prod 2", quantity:1, price:600},
  { id:3, title:"Prod 3", quantity:1, price:50},
  { id:4, title:"Prod 4", quantity:1, price:80},
  { id:5, title:"Prod 5", quantity:1, price:10},
  ]

const initState = {
  products:products
}

function reducer(state,action){
  switch (action.type) {
    case 'product/added':
      return {
        ...state,
        products:[...state.products, action.payload]
      }
      
    case 'product/removed':
      return {
        ...state,
        products:state.products.filter(p=>p.id !== action.payload)
      }  
      
    case 'product/quantityInc':
      return {
        ...state,
        products:state.products.map(p=>{
           if(p.id === action.payload){
             return {
              ...p,
              quantity:(p.quantity || 0) + 1
            }
          } 
          return p
        })
      }  
      
      case 'product/quantityDec':
      return {
        ...state,
        products:state.products.map(p=>{
           if(p.id === action.payload){
             return {
              ...p,
              quantity:p.quantity - 1
            }
          } 
          return p
        })
      }  
    
    default:
      throw new Error("Invalid action")
  }
}

function App() {
  
  const [{products}, dispatch] = useReducer(reducer, initState);
  
  const totalPrice = products.reduce((acc, product) => {
    return acc + (product.price * (product.quantity || 0));
  }, 0)
        
  function handleAdd(){
    const newProduct = {
      id: Date.now(),
      title: `Prod ${Date.now()}`,
      quantity:1,
      price:20
    }
    
    dispatch({type:'product/added', payload:newProduct})
  }
  
  function handleRemove(id){
    dispatch({type:'product/removed', payload:id})
  }
  
  
  return (
    <div>
      <button type="button" onClick={handleAdd}>
        Add Product
      </button>
      <br/>
      {
        products.map(item => (
          <>
          <button disabled={item.quantity === 9} onClick={()=>dispatch({type:'product/quantityInc', payload:item.id})}>+</button>
          <button disabled={item.quantity === 0} onClick={()=>dispatch({type:'product/quantityDec', payload:item.id})}>-</button>
          <span key={item.id}>{item.title} - {item.quantity} - Rs {item.price * item.quantity}
            <button type="button" onClick={()=>handleRemove(item.id)}>Remove</button>
          </span>
          <br/>
          </>
        ))
      }
      <br/>
      {totalPrice > 0 && <b>Total Price: Rs {totalPrice}</b>}
    </div>
  )
}

export default App
