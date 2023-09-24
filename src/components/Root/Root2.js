import React from 'react'
import SideBar from '../Profile/SideBar'
import { Outlet } from 'react-router-dom'
import classes from "./Root.module.css";

const Root2 = () => {
  return (
    <div className={classes.root}>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default Root2
