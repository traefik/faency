import React from 'react'
import App from './App'
import { Provider as FaencyProvider } from '@containous/faency'

export const wrapPageElement = props => (
  <FaencyProvider>
    <App {...props} />
  </FaencyProvider>
)
