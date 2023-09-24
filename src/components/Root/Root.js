import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
// import classes from "./Root.module.css"

const Root = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Root
