import React from 'react'
import { createContext } from 'react';

export const localStorageContext = createContext();

export default function LocalStorageContext({ children }) {

  let userId = ''
  let userEmail = ''
  if ( JSON.parse(localStorage.getItem('onKart')) !== null ) {
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('onKart'))
    userId = userDataFromLocalStorage.user._id
    userEmail = userDataFromLocalStorage.user.email
  }

  return (
    <localStorageContext.Provider value={{userId, userEmail}} >
      {children}
    </localStorageContext.Provider>
  )
}

