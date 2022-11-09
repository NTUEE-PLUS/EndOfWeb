/* eslint-disable prettier/prettier */
import React from 'react'
const AuthMatching = React.lazy(() => import('./matching'))
<<<<<<< HEAD
const AuthRegister=React.lazy(() => import('./register'))
const AuthAnnounce=React.lazy(() => import('./announce'))
export { AuthMatching, AuthRegister,AuthAnnounce }
=======
const AuthRegister = React.lazy(() => import('./register'))
const AuthColumn = React.lazy(() => import('./column'))
export { AuthMatching, AuthRegister, AuthColumn }
>>>>>>> 187e090 (v1,not finish yet)
