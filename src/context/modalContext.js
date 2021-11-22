import React, { useState, createContext } from 'react'
const ModalContext = createContext()

const stateProvider = (props) => {
  const [inviteModal, setInviteModal] = useState(false)
  const [trialStatus, setTrialStatus] = useState(false)

  return (
    <ModalContext.Provider value = {{ inviteModal, setInviteModal, trialStatus, setTrialStatus }}>
      {props.children}
    </ModalContext.Provider>
  )
}

export default stateProvider
export { ModalContext }
