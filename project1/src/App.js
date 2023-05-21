import React from 'react'
import Nav from './components/Nav'
import RouterConfig from './router/index'

export default function App() {

  return (
    <div>
      <Nav/>
      
      <RouterConfig/>
      
      {/* <button onClick={()=>{
        console.log(user);
      }}>button</button> */}
    </div>
  )
}
