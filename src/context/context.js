import React, { useState, createContext } from 'react'
const Context = createContext()

const stateProvider = (props) => {
  const [isSubscribed, setisSubscribed] = useState(false)

  return (
    <Context.Provider value = {[isSubscribed, setisSubscribed]}>
      {props.children}
    </Context.Provider>
  )
}

export default stateProvider
export { Context }
