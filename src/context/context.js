import React, { useState, createContext } from 'react'
const Context = createContext()

const stateProvider = (props) => {
  const [isSubscribed, setisSubscribed] = useState(false)
  const [isNewlyAdded, setIsNewlyAdded] = useState(false)

  return (
    <Context.Provider value = {{ isSubscribed, setisSubscribed, isNewlyAdded, setIsNewlyAdded }}>
      {props.children}
    </Context.Provider>
  )
}

export default stateProvider
export { Context }
