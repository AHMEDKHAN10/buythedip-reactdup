import React, { useState, createContext } from 'react'

export const Context = createContext()

export const stateProvider = (props) => {
  const [isSubscribed, setisSubscribed] = useState(false)

  return (
    <Context.Provider value = {[isSubscribed, setisSubscribed]}>
      {props.children}
    </Context.Provider>
  )
}
