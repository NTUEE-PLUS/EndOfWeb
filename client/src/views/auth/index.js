/* eslint-disable prettier/prettier */
import React from 'react'
const AuthMatching = React.lazy(() => import('./matching'))
const AuthRegister = React.lazy(() => import('./register'))
const AuthAnnounce = React.lazy(() => import('./announce'))
const AuthColumn = React.lazy(() => import('./column'))
export { AuthMatching, AuthRegister, AuthColumn, AuthAnnounce }
