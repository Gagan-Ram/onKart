import React, { useState } from 'react'
import { createContext } from 'react';

export const userContext = createContext();

export default function HomeContext({ children }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  return (
    <userContext.Provider value={{ name: [username, setUsername], pass: [password, setPassword], email: [email, setEmail] }} >
      {children}
    </userContext.Provider>
  )
}


