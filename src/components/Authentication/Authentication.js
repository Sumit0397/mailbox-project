import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'

const Authentication = () => {
  const [showLogin , setShowLogin] = useState(true);

  const hideHandler = () => {
    setShowLogin(false);
  }

  const showHandler = () => {
    setShowLogin(true);
  }

  return (
    <div>
      {!showLogin && <Signup onShow={showHandler}/>}
      {showLogin && <Login onHide={hideHandler}/>}
    </div>
  )
}

export default Authentication
